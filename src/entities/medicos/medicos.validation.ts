import { NextFunction, Request, Response } from "express";
import { ObjectId } from "@mikro-orm/mongodb";
import { InvalidFields, InvalidId } from "../../shared/errors.js";
import Joi from "joi";

const isValidObjectId = (value: string) => {
  return ObjectId.isValid(value);
};

const medicoUpdate = Joi.object({
  nombre: Joi.string().min(2).max(30),
  apellido: Joi.string().min(2).max(30),
  especialidad: Joi.string()
    .custom((value, helpers) => {
      if (!isValidObjectId(value)) {
        return helpers.error("custom");
      }
      return value;
    })
    .messages({
      custom:
        "El id de la especialidad debe ser un ObjectId válido (24 caracteres hexadecimales).",
    }),
  dni: Joi.string().min(8).max(10),
  tipoDni: Joi.string().min(2).max(30),
  rol: Joi.string()
    .custom((value, helpers) => {
      if (!isValidObjectId(value)) {
        return helpers.error("custom");
      }
      return value;
    })
    .messages({
      custom:
        "El id del rol debe ser un ObjectId válido (24 caracteres hexadecimales).",
    }),
  matricula: Joi.string().min(10).max(15),
  horaDesde: Joi.string().min(5).max(5),
  horaHasta: Joi.string().min(5).max(5),
  diasAtencion: Joi.array(),
});

export const validateInput = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.params.id) {
    if (!isValidObjectId(req.params.id)) {
      next(new InvalidId());
    }
  }

  if (Object.keys(req.body).length) {
    const { error } = medicoUpdate.validate(req.body);

    if (error) {
      next(new InvalidFields(error.details[0].message));
    }
  }

  next();
};

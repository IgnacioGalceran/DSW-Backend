import { NextFunction, Request, Response } from "express";
import { ObjectId } from "@mikro-orm/mongodb";
import { InvalidFields, InvalidId } from "../../shared/errors.js";
import Joi from "joi";

const isValidObjectId = (value: string) => {
  return ObjectId.isValid(value);
};

const turnos = Joi.object({
  fecha: Joi.date().required(),
  rango: Joi.string().required(),
  medico: Joi.string()
    .custom((value, helpers) => {
      if (!isValidObjectId(value)) {
        return helpers.error("custom");
      }
      return value;
    })
    .messages({
      custom:
        "El id del medico debe ser un ObjectId válido (24 caracteres hexadecimales).",
    }),
  paciente: Joi.string()
    .custom((value, helpers) => {
      if (!isValidObjectId(value)) {
        return helpers.error("custom");
      }
      return value;
    })
    .messages({
      custom:
        "El id del paciente debe ser un ObjectId válido (24 caracteres hexadecimales).",
    }),
});

export const validateInput = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("id:", req.params.id);
  if (req.params.id) {
    if (!isValidObjectId(req.params.id)) {
      next(new InvalidId());
    }
  }

  if (Object.keys(req.body).length) {
    const { error } = turnos.validate(req.body);

    if (error) {
      next(new InvalidFields(error.details[0].message));
    }
  }

  next();
};

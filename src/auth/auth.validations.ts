import { NextFunction, Request, Response } from "express";
import { ObjectId } from "@mikro-orm/mongodb";
import { InvalidFields } from "../shared/errors.js";
import Joi from "joi";

const isValidObjectId = (value: string) => {
  return ObjectId.isValid(value);
};

const registerMedico = Joi.object({
  uid: Joi.string().min(2).max(50).required(),
  nombre: Joi.string().min(2).max(30).required(),
  apellido: Joi.string().min(2).max(30).required(),
  dni: Joi.string().min(8).max(10).required(),
  tipoDni: Joi.string().min(2).max(30).required(),
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
  matricula: Joi.string().min(10).max(15).required(),
  horaDesde: Joi.string().min(5).max(5).required(),
  horaHasta: Joi.string().min(5).max(5).required(),
  diasAtencion: Joi.array().required(),
  telefono: Joi.string().min(8).max(15).required(),
});

const registerPaciente = Joi.object({
  uid: Joi.string().min(2).max(50).required(),
  nombre: Joi.string().min(2).max(30).required(),
  apellido: Joi.string().min(2).max(30).required(),
  dni: Joi.string().min(8).max(10).required(),
  tipoDni: Joi.string().min(2).max(30).required(),
});

export const validateRegister = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let register: string = req.url.split("/")[1];
  let errorJoi!: Joi.ValidationError | undefined;

  switch (register) {
    case "registerMedico": {
      const { error } = registerMedico.validate(req.body);
      errorJoi = error;
      break;
    }
    case "registerPaciente": {
      const { error } = registerPaciente.validate(req.body);
      errorJoi = error;
      break;
    }
    default:
      break;
  }

  if (errorJoi) {
    next(new InvalidFields(errorJoi.details[0].message));
  }

  next();
};

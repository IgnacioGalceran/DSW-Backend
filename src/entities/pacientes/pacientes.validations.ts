import { NextFunction, Request, Response } from "express";
import { ObjectId } from "@mikro-orm/mongodb";
import { InvalidFields, InvalidId } from "../../shared/errors.js";
import Joi from "joi";

const isValidObjectId = (value: string) => {
  return ObjectId.isValid(value);
};

const pacienteAdd = Joi.object({
  usuario: Joi.object({
    uid: Joi.string().min(0).max(50).allow(null),
    nombre: Joi.string().min(2).max(30).required().messages({
      "string.min": "La longitud mínima es de 2 caracteres",
      "string.max": "La longitud máxima es de 30 caracteres",
      "string.empty": "Este campo no puede estar vacío",
      "any.required": "Este nombre es requerido *",
    }),
    apellido: Joi.string().min(2).max(30).required().messages({
      "string.min": "La longitud mínima es de 2 caracteres",
      "string.max": "La longitud máxima es de 30 caracteres",
      "string.empty": "Este campo no puede estar vacío",
      "any.required": "Este apellido es requerido *",
    }),
    tipoDni: Joi.string().required().required().messages({
      "string.empty": "Este campo no puede estar vacío",
      "any.required": "Este tipoDNI es requerido *",
    }),
    dni: Joi.number().min(1000000).max(60000000).required().messages({
      "any.empty": "Este campo no puede estar vacío",
      "any.valid": "Debe ser un número",
      "number.min": "La longitud mínima es de 7 números",
      "number.max": "La longitud máxima es de 8 números",
      "any.required": "Este dni es requerido *",
    }),
  }),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .min(6)
    .max(50)
    .required()
    .messages({
      "string.min": "La longitud mínima es de 6 caracteres",
      "string.max": "La longitud máxima es de 50 caracteres",
      "string.empty": "Este campo no puede estar vacío",
      "any.required": "Este email es requerido *",
    }),
  password: Joi.string().min(8).max(20).required().messages({
    "string.min": "La longitud mínima es de 8 caracteres",
    "string.max": "La longitud máxima es de 20 caracteres",
    "string.empty": "Este campo no puede estar vacío",
    "any.required": "Este pass es requerido *",
  }),
  repeatPassword: Joi.string().min(8).max(20).required().messages({
    "string.min": "La longitud mínima es de 8 caracteres",
    "string.max": "La longitud máxima es de 20 caracteres",
    "string.empty": "Este campo no puede estar vacío",
    "any.required": "Este repeatpass es requerido *",
  }),
});

const pacienteUpdate = Joi.object({
  nombre: Joi.string().min(2).max(30),
  apellido: Joi.string().min(2).max(30),
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
});

export const validateInput = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("ultimo");
  console.log(req.body.sanitizedInput);

  if (req.params.id) {
    if (!isValidObjectId(req.params.id)) {
      next(new InvalidId());
    }
  }

  let errorJoi!: Joi.ValidationError | undefined;
  if (Object.keys(req.body.sanitizedInput).length) {
    if (req.method === "POST") {
      const { error } = pacienteAdd.validate(req.body.sanitizedInput);
      console.log(error);
      errorJoi = error;
    } else if (req.method === "PUT") {
      const { error } = pacienteUpdate.validate(req.body.sanitizedInput);
      errorJoi = error;
    }
  }

  if (errorJoi) {
    next(new InvalidFields(errorJoi.details[0].message));
  }

  next();
};

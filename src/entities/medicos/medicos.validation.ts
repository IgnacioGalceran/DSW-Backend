import { NextFunction, Request, Response } from "express";
import { ObjectId } from "@mikro-orm/mongodb";
import { InvalidFields, InvalidId } from "../../shared/errors.js";
import Joi from "joi";

const isValidObjectId = (value: string) => {
  return ObjectId.isValid(value);
};

export const medicoAdd = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .min(6)
    .max(50)
    .required()
    .messages({
      "string.min": "La longitud mínima es de 6 caracteres",
      "string.max": "La longitud máxima es de 50 caracteres",
      "string.empty": "Este campo no puede estar vacío",
      "any.required": "Este campo es requerido *",
    }),
  password: Joi.string().min(8).max(20).required().messages({
    "string.min": "La longitud mínima es de 8 caracteres",
    "string.max": "La longitud máxima es de 20 caracteres",
    "string.empty": "Este campo no puede estar vacío",
    "any.required": "Este campo es requerido *",
  }),
  repeatPassword: Joi.string().min(8).max(20).required().messages({
    "string.min": "La longitud mínima es de 8 caracteres",
    "string.max": "La longitud máxima es de 20 caracteres",
    "string.empty": "Este campo no puede estar vacío",
    "any.required": "Este campo es requerido *",
  }),
  matricula: Joi.string().min(2).max(50).required().messages({
    "string.min": "La longitud mínima es de 3 caracteres",
    "string.max": "La longitud máxima es de 10 caracteres",
    "string.empty": "Este campo no puede estar vacío",
    "any.required": "Este campo es requerido *",
  }),
  usuario: Joi.object({
    uid: Joi.string().min(0).max(50).allow(null),
    nombre: Joi.string().min(2).max(30).required().messages({
      "string.min": "La longitud mínima es de 2 caracteres",
      "string.max": "La longitud máxima es de 30 caracteres",
      "string.empty": "Este campo no puede estar vacío",
      "any.required": "Este campo es requerido *",
    }),
    apellido: Joi.string().min(2).max(30).required().messages({
      "string.min": "La longitud mínima es de 2 caracteres",
      "string.max": "La longitud máxima es de 30 caracteres",
      "string.empty": "Este campo no puede estar vacío",
      "any.required": "Este campo es requerido *",
    }),
    tipoDni: Joi.string().required().required().messages({
      "string.empty": "Este campo no puede estar vacío",
      "any.required": "Este campo es requerido *",
    }),
    dni: Joi.number().min(1000000).max(60000000).required().messages({
      "any.empty": "Este campo no puede estar vacío",
      "any.valid": "Debe ser un número",
      "number.min": "La longitud mínima es de 7 números",
      "number.max": "La longitud máxima es de 8 números",
      "any.required": "Este campo es requerido *",
    }),
  }),
});


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
  
  let errorJoi!: Joi.ValidationError | undefined;

  if (Object.keys(req.body).length) {
    if(req.method === "POST"){
      const { error } = medicoAdd.validate(req.body);
      errorJoi = error;
    }else if (req.method === 'PUT'){
      const { error } = medicoUpdate.validate(req.body);
      errorJoi = error;
    }
  }

  if (errorJoi) {
    next(new InvalidFields(errorJoi.details[0].message));
  }

  next();
};

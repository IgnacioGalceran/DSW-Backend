import { NextFunction, Request, Response } from "express";
import { ObjectId } from "@mikro-orm/mongodb";
import { InvalidFields } from "../shared/errors.js";
import Joi from "joi";

const isValidObjectId = (value: string) => {
  return ObjectId.isValid(value);
};

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
  // let register: string = req.url.split("/")[1];
  let errorJoi!: Joi.ValidationError | undefined;

  // switch (register) {
  //   case "registerPaciente": {
  //     const { error } = registerPaciente.validate(req.body);
  //     errorJoi = error;
  //     break;
  //   }
  //   default:
  //     break;
  // }

  if (errorJoi) {
    next(new InvalidFields(errorJoi.details[0].message));
  }

  next();
};

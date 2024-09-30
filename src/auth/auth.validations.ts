import { NextFunction, Request, Response } from "express";
import { ObjectId } from "@mikro-orm/mongodb";
import { InvalidFields } from "../shared/errors.js";
import Joi from "joi";

const isValidObjectId = (value: string) => {
  return ObjectId.isValid(value);
};

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

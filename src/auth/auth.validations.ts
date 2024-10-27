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
  let errorJoi!: Joi.ValidationError | undefined;
  if (errorJoi) {
    next(new InvalidFields(errorJoi.details[0].message));
  }

  next();
};

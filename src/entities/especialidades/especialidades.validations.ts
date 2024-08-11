import { NextFunction, Request, Response } from "express";
import { ObjectId } from "@mikro-orm/mongodb";
import { InvalidFields, InvalidId } from "../../shared/errors.js";
import Joi from "joi";

const isValidObjectId = (value: string) => {
  return ObjectId.isValid(value);
};

const especialidades = Joi.object({
  nombre: Joi.string().min(2).max(30).required(),
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
    const { error } = especialidades.validate(req.body);

    if (error) {
      next(new InvalidFields(error.details[0].message));
    }
  }

  next();
};

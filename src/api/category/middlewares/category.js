
import Joi from "joi";
import { errorResponse } from "rapidjet"

export const createRequest = async (req, res, next) => {
  const JoiSchema = Joi.object({
    "name": Joi.string().required(),
    "description": Joi.string().required(),
  });

  const result = JoiSchema.validate(req.body);

  if (result.error) {
    return res.status(400).send({
      status: "failure",
      status_code: 400,
      message: result.error.message,
      errors: result.error,
      request_body: req.body
    });
  }

  next();
}
export const updateRequest = async (req, res, next) => {
  const JoiSchema = Joi.object({
    "name": Joi.string().optional(),
    "description": Joi.string().optional(),
  });

  const result = JoiSchema.validate(req.body);

  if (result.error) {
    return res.status(400).send({
      status: "failure",
      status_code: 400,
      message: result.error.message,
      errors: result.error,
      request_body: req.body
    });
  }

  next();
}

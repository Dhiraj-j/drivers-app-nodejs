
import Joi from "joi";
import { errorResponse } from "rapidjet"
import { responseHandler } from "../../../utils/responseHandler";

export const createRequest = async (req, res, next) => {
  const JoiSchema = Joi.object({
    "name": Joi.string().required(),
    "description": Joi.string().optional(),
    "price": Joi.number().positive().required(),
    "gallery": Joi.array().items(Joi.string).optional(),
    "preferences": Joi.string().valid("VEG", "NON-VEG", "EGG").required(),
    "available": Joi.boolean().optional(),
    "thumbnail": Joi.string().optional(),
    "StoreId": Joi.number().positive().required()
  });

  const result = JoiSchema.validate(req.body);

  if (result.error) {
    return res.status(400).send(responseHandler({
      status: "failure",
      "status_code": 400,
      message: result.error.message,
      request_body: req.body,
      errors: result.error
    }))
  }

  next();
}
export const updateRequest = async (req, res, next) => {
  const JoiSchema = Joi.object({
    "name": Joi.string().optional(),
    "description": Joi.string().optional(),
    "price": Joi.number().positive().optional(),
    "gallery": Joi.array().items(Joi.string).optional(),
    "preferences": Joi.string().valid("VEG", "NON-VEG", "EGG").optional(),
    "available": Joi.boolean().optional(),
    "thumbnail": Joi.string().optional(),
    "StoreId": Joi.number().positive().required()
  });

  const result = JoiSchema.validate(req.body);

  if (result.error) {
    return res.status(400).send(responseHandler({
      status: "failure",
      "status_code": 400,
      message: result.error.message,
      request_body: req.body,
      errors: result.error
    }))
  }

  next();
}

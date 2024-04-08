
import Joi from "joi";
import { errorResponse } from "rapidjet"

export const createRequest = async (req, res, next) => {
  const JoiSchema = Joi.object({
    "name": Joi.string().required(),
    "description": Joi.string().optional(),
    "logo": Joi.string().optional(),
    "latitude": Joi.number().optional(),
    "longitude": Joi.number().optional(),
    "opening_time": Joi.string().pattern(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/).optional(),
    "closing_time": Joi.string().pattern(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/).optional(),
    "gallery": Joi.array().items(Joi.string()).optional(),
    "StoreTypeId": Joi.number().positive().required()
  });

  const result = JoiSchema.validate(req.body);

  if (result.error) {
    return res.status(400).send(errorResponse({
      message: result.error.message,
      details: result.error.details
    }));
  }

  await next();
}
export const updateRequest = async (req, res, next) => {
  const JoiSchema = Joi.object({
    "name": Joi.string().optional(),
    "description": Joi.string().optional(),
    "logo": Joi.string().optional(),
    "latitude": Joi.number().optional(),
    "longitude": Joi.number().optional(),
    "opening_time": Joi.string().pattern(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/).optional(),
    "closing_time": Joi.string().pattern(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/).optional(),
    "gallery": Joi.array().items(Joi.string()).optional(),
    "StoreTypeId": Joi.number().positive().optional()
  });

  const result = JoiSchema.validate(req.body);

  if (result.error) {
    return res.status(400).send(errorResponse({
      message: result.error.message,
      details: result.error.details
    }));
  }

  await next();
}

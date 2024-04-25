
import Joi from "joi";
import { responseHandler } from "../../../utils/responseHandler.js";

export const createRequest = async (req, res, next) => {
  const JoiSchema = Joi.object({
    "name": Joi.string().required(),
    "description": Joi.string().optional(),
    "price": Joi.number().positive().required(),
    "gallery": Joi.array().items(Joi.string()).optional(),
    "preferences": Joi.string().valid("VEG", "NON-VEG", "EGG").required(),
    "available": Joi.boolean().optional(),
    "thumbnail": Joi.string().optional(),
    "MenuCategoryId": Joi.number().positive().required(),
    "StoreId": Joi.number().positive().required(),
    "calories": Joi.number().positive().required(),
    "grams": Joi.number().positive().required(),
    "proteins": Joi.number().positive().required(),
    "fats": Joi.number().positive().required(),
    "cooking_time": Joi.number().positive(),
    "strike_price": Joi.number().positive().required()
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
    "gallery": Joi.array().items(Joi.string()).optional(),
    "preferences": Joi.string().valid("VEG", "NON-VEG", "EGG").optional(),
    "available": Joi.boolean().optional(),
    "thumbnail": Joi.string().optional(),
    "MenuCategoryId": Joi.number().positive().optional(),
    "StoreId": Joi.number().positive().optional(),
    "calories": Joi.number().positive().optional(),
    "grams": Joi.number().positive().optional(),
    "proteins": Joi.number().positive().optional(),
    "fats": Joi.number().positive().optional(),
    "cooking_time": Joi.number().positive().optional(),
    "strike_price": Joi.number().positive().optional()
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

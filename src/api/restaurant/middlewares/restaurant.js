
import Joi from "joi";
import { errorResponse } from "rapidjet"

export const createRequest = async (req, res, next) => {
  const JoiSchema = Joi.object({
    "name": Joi.string().min(5).required(),
    "description": Joi.string().optional(),
    "logo": Joi.string().optional(),
    "latitude": Joi.number().required(),
    "longitude": Joi.number().required(),
    "opening_time": Joi.string().pattern(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/),
    "closing_time": Joi.string().pattern(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/),
    "gallery": Joi.array().items(Joi.string()).optional(),
  });

  const result = JoiSchema.validate(req.body);

  if (result.error) {
    return res.status(400).send({
      statu: "failure",
      status_code: 400,
      errors: result.error,
      messasge: result.error.message,
      request_body: req.body
    });
  }

  next();
}

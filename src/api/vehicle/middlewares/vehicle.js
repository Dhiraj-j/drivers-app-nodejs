
import Joi from "joi";
import { errorResponse } from "rapidjet"

export const createRequest = async (req, res, next) => {
  const JoiSchema = Joi.object({
    vehicles: Joi.array().items(Joi.object({
      "name": Joi.string(),
      "model": Joi.string(),
      "color": Joi.string(),
      "number": Joi.string(),
      "image": Joi.string(),
    })).min(1)
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

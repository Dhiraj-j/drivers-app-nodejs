
import Joi from "joi";
import { currency } from "../../../constants/setting.js";
import { responseHandler } from "../../../utils/responseHandler.js";

export const createRequest = async (req, res, next) => {
  const JoiSchema = Joi.object({
    "password_length": Joi.number().optional(),
    "currency": Joi.string().valid(...currency).optional(),
    "charges_per_kg": Joi.number().positive().optional(),
  });

  const result = JoiSchema.validate(req.body);

  if (result.error) {
    return res.status(400).send(responseHandler({ status: 'failure', status_code: 400, message: result.error.message, request_body: req.body, more_info: result.error.details, errors: result.error }));
  }

  await next();
}

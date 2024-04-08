
import Joi from "joi";
import { responseHandler } from "../../../utils/responseHandler.js";

export const createRequest = async (req, res, next) => {
  const JoiSchema = Joi.object({
    "name": Joi.string(),
    "description": Joi.text(),
  });

  const result = JoiSchema.validate(req.body);

  if (result.error) {
    return res.status(400).send(responseHandler({
      status: "failure",
      status_code: 400,
      errors: result.error,
      message: result.error.message,
      request_body: req.body,
    }))
  }

  next();
}

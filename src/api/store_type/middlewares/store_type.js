
import Joi from "joi";
import { errorResponse } from "rapidjet"
import { responseHandler } from "../../../utils/responseHandler.js";

export const createRequest = async (req, res, next) => {
  const JoiSchema = Joi.object({
    "name": Joi.string().required(),
    "description": Joi.string().optional(),
  });

  const result = JoiSchema.validate(req.body);

  if (result.error) {
    return res.status(400).send(responseHandler({
      status: "failure",
      status_code: 400,
      request_body: req.body,
      errors: result.error,
      message: result.error.message
    }))
  }

  next();
}

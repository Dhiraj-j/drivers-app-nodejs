
import Joi from "joi";
import { errorResponse } from "rapidjet"
import { responseHandler } from "../../../utils/responseHandler";

export const createRequest = async (req, res, next) => {
  const JoiSchema = Joi.object({
    "question": Joi.string().optional(),
    "answer": Joi.string().optional(),
  });

  const result = JoiSchema.validate(req.body);

  if (result.error) {
    return res.status(400).send(responseHandler({
      status: 'failure', status_code: 400,
      request_body: req.body,
      errors: result.error,
      message: result.error.message,
      more_info: result.error.details
    }));
  }
  next();
}

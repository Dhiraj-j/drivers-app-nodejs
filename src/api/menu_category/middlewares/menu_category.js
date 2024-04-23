
import Joi from "joi";
import { errorResponse } from "rapidjet"
import { responseHandler } from "../../../utils/responseHandler";

export const createRequest = async (req, res, next) => {
  const JoiSchema = Joi.object({
    "name": Joi.string().optional().required(),
    "store_ids": Joi.array().items(Joi.number()).optional()
  });

  const result = JoiSchema.validate(req.body);

  if (result.error) {
    return res.status(400).send(responseHandler({ status: 'failure', status_code: 400, message: result.error.message, errors: result.error }))
  }

  await next();
}

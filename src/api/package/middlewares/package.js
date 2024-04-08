
import Joi from "joi";
import { errorResponse } from "rapidjet"
import { shipping_method, package_size, package_type } from "../../../constants/package";

export const createRequest = async (req, res, next) => {
  const JoiSchema = Joi.object({
    "sender_name": Joi.string().required(),
    "sender_mobile": Joi.string().required(),
    "sender_address": Joi.string().required(),
    "pickup_date": Joi.string().required(),
    "pickup_time": Joi.string().required(),
    "receiver_name": Joi.string().required(),
    "receiver_address": Joi.string().required(),
    "message": Joi.string().optional(),
    "PackageCategoryId": Joi.number().positive().required(),
    "package_type": Joi.string().valid(...Object.values(package_type)).required(),
    "package_size": Joi.string().valid(...Object.values(package_size)).required(),
    "package_image": Joi.string().optional(),
    "shipping_method": Joi.string().valid(...Object.values(shipping_method)).required(),
    "package_note": Joi.string().optional(),
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

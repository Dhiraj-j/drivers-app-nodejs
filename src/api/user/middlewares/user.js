
import Joi from "joi";
import { errorResponse } from "rapidjet"
import { gender, user_types } from "../../../constants/user.js";

export const createRequest = async (req, res, next) => {
  const JoiSchema = Joi.object({
    "name": Joi.string().required(),
    "email": Joi.string().required(),
    "phone": Joi.string().required(),
    "password": Joi.string().min(6).required(),
    "Role": Joi.string().valid(...Object.values(user_types)).optional(),
  });

  const result = JoiSchema.validate(req.body);

  if (result.error) {
    return res.status(400).send({
      status: "failure",
      status_code: 400,
      messages: result.error.message,
      request_body: req.body
    })
  }
  req.body.email = req?.body?.email?.toLowerCase();
  next();
}
export const updateRequest = async (req, res, next) => {
  const JoiSchema = Joi.object({
    "name": Joi.string().required(),
    "email": Joi.string().required(),
    "phone": Joi.string().required(),
    "gender": Joi.string().valid(...Object.values(gender)).required().optional(),
    "dob": Joi.date().iso({ strict: true }).required().messages({
      "date.format": "date of birth must be in format - YYYY-MM-DD"
    }),
    "address": Joi.string().required(),
    "profile_image": Joi.string().required(),
    "vehicles": Joi.array().items(Joi.object({
      "name": Joi.string().required(),
      "model": Joi.string().required(),
      "number": Joi.string().required(),
      "color": Joi.string().required(),
      "image": Joi.string().required(),
    })).min(1).optional()
    // "user_type": Joi.string().required(),
  });

  const result = JoiSchema.validate(req.body);
  req.body.email = req?.body?.email?.toLowerCase();
  if (result.error) {
    return res.status(400).send({
      status: "failure",
      status_code: 400,
      messages: result.error.message,
      request_body: req.body
    })
  }

  next();
}

export const loginRequest = async (req, res, next) => {

  const JoiSchema = Joi.object({
    "email": Joi.string().required(),
    "password": Joi.string().required(),
  });

  const result = JoiSchema.validate(req.body);
  req.body.email = req?.body?.email?.toLowerCase();

  if (result.error) {
    return res.status(400).send({
      status: "failure",
      status_code: 400,
      messages: result.error.message,
      request_body: req.body
    })
  }

  next();
}
export const forgetRequest = async (req, res, next) => {
  const JoiSchema = Joi.object({
    "email": Joi.string(),
    "phone": Joi.string(),
  }).xor("email", "phone").messages({
    'object.xor': 'Either an email or a phone number is acceptable along.'
  });

  const result = JoiSchema.validate(req.body);
  if (req.body.email) req.body.email = req.body.email.toLowerCase();

  if (result.error) {
    return res.status(400).send({
      status: "failure",
      status_code: 400,
      messages: result.error.message,
      request_body: req.body
    })
  }
  next();
}
export const resetRequest = async (req, res, next) => {
  const JoiSchema = Joi.object({
    "email": Joi.string(),
    "phone": Joi.string(),
    "otp": Joi.number().required(),
    "password": Joi.string().min(6).required()
  }).xor("email", "phone").and("otp", "password").messages({
    'object.xor': 'Either an email or a phone number is acceptable along with the OTP.'
  });

  const result = JoiSchema.validate(req.body);
  if (req.body.email) req.body.email = req.body.email.toLowerCase();

  if (result.error) {
    return res.status(400).send({
      status: "failure",
      status_code: 400,
      messages: result.error.message,
      request_body: req.body
    })
  }
  next();
}

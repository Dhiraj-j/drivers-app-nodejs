
        import Joi from "joi";
        import {errorResponse} from "rapidjet"            

        export const createRequest = async (req,res, next) => {
          const JoiSchema = Joi.object({
            "otp": Joi.string(),
"expires": Joi.date(),
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
          
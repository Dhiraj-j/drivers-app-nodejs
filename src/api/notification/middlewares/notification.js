
        import Joi from "joi";
        import {errorResponse} from "rapidjet"            

        export const createRequest = async (req,res, next) => {
          const JoiSchema = Joi.object({
            "message": Joi.text(),
"isRead": Joi.boolean(),
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
          
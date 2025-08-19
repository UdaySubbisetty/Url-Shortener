import Joi from "joi";
const urlSchema = Joi.object({
  originalUrl: Joi.string().uri().required(),
  clicks: Joi.number().default(0),
}); 

export default urlSchema
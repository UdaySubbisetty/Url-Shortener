import Joi from "joi"

const registerSchema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    password: Joi.string().min(6).required(),
    email: Joi.string().email().required(),
})

const loginSchema = Joi.object({
  email: Joi.string().email().optional(),
  name: Joi.string().optional(),
  password: Joi.string().required(),
});


export { registerSchema, loginSchema };
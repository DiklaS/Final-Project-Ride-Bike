import Joi from "joi";

import validation from "./validation";

const loginSchema = Joi.object({
  email: Joi.string()
    .regex(
      new RegExp(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/)
    )
    .required(),
  password: Joi.string()
    .regex(
      new RegExp(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]{4})(?=.*[!@%$#^&*-_*]).{8,}$/
      )
    )
    .required().messages({
      'string.pattern.base': 'Password must be 8 characters long and must include an uppercase letter, a lowercase letter, 4 numbers and (?=.*[!@%$#^&*-_*])',
      'any.required': 'Password is required.',
    }),
});

const validateLoginSchema = (userInput) => validation(loginSchema, userInput);

export default validateLoginSchema;

import Joi from "joi";

import validation from "./validation";

const bizNumberSchema = Joi.object({
    bizNumber: Joi.string().pattern(/^\d{7}$/).label('Bussiness number').messages({
    'string.pattern.base': `"{#label}" must be a string of 7 numbers`,
  }).required(),
});

const validatebizNumberSchema = (userInput) =>
  validation(bizNumberSchema, userInput); 


export default validatebizNumberSchema;



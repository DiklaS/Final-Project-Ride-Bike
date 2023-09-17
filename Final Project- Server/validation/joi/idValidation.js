const Joi = require("joi");

const idSchema = Joi.string()
  .length(24)
  .regex(/^[0-9a-fA-F]+$/)
  .message('ID must be a 24-character hexadecimal string.');

const validateIdSchema = (idInput) => {
  return idSchema.validateAsync(idInput);
};


module.exports = {
  validateIdSchema,
};

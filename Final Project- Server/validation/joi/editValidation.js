const Joi = require("joi");

const editSchema = Joi.object({
  name: Joi.object()
    .keys({
      firstName: Joi.string().min(2).max(256).required(),
      middleName: Joi.string().min(2).max(256).allow(""),
      lastName: Joi.string().min(2).max(256).required(),
    })
    .required(),
  phone: Joi.string()
    .regex(new RegExp(/0[0-9]{1,2}\-?\s?[0-9]{3}\s?[0-9]{4}/))
    .required(),
  email: Joi.string()
    .regex(
      new RegExp(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/)
    )
    .required(),
  image: Joi.object().keys({
    url: 
      Joi.string().regex(
      new RegExp(/(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,}|imgs\/[^\s]+\.(?:jpg|jpeg|png|gif|bmp)|\/uploads\/[^\s]+\.(?:jpg|jpeg|png|gif|bmp))/i,)
    )
    .allow(""), 
    alt: Joi.string().min(2).max(256).required().allow(""),
  }).allow(""),
  address: Joi.object()
    .keys({
      state: Joi.string().min(2).max(256).allow(""),
      country: Joi.string().min(2).max(256).required(),
      city: Joi.string().min(2).max(256).required(),
      street: Joi.string().min(2).max(256).required(),
      houseNumber: Joi.number().min(1).required(),
      zip: Joi.number().label("Zip").allow(null).allow(''),
    })
    .required(),
  isAdmin: Joi.boolean(),
  //isBusiness: Joi.boolean().required(),
});

const validateEditSchema = (userInput) =>
  editSchema.validateAsync(userInput);

module.exports = {
  validateEditSchema,
};

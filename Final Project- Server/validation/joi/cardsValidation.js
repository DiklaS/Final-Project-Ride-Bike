const Joi = require("joi");

const createCardSchema = Joi.object({
  item: Joi.string().min(2).max(256).required(),
  company: Joi.string().min(2).max(256).required(),
  price: Joi.number().min(10).max(100000).required(),
  size: Joi.string().min(1).max(256).allow(""),
  location: Joi.string().min(2).max(256).required(),
  contactName: Joi.string().min(2).max(256).required(),
  phone: Joi.string().regex(new RegExp(/0[0-9]{1,2}\-?\s?[0-9]{3}\s?[0-9]{4}/)).required(),
  image: Joi.object().keys({
    url: Joi.string().regex(
      new RegExp(
  /^(https?:\/\/)?([\w.-]+)(:\d+)?(\/[^\s?#]*)?(\?[^?\s#]*)?(#\S*)?$/
)
    ).required(),
    alt: Joi.string().min(2).max(256).required(),
  }).required(),
  email: Joi.string()
  .regex(
    new RegExp(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/)
  ).allow(""),
  /* title: Joi.string().min(2).max(256).required(),
  subTitle: Joi.string().min(2).max(256).required(),
  description: Joi.string().min(2).max(1024).required(),
  phone: Joi.string()
    .regex(new RegExp(/0[0-9]{1,2}\-?\s?[0-9]{3}\s?[0-9]{4}/))
    .required(),
  email: Joi.string()
    .regex(
      new RegExp(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/)
    )
    .required(),
  web: Joi.string()
    .regex(
      new RegExp(
        /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/
      )
    )
    .allow(""),
  image: Joi.object().keys({
    url: Joi.string().regex(
      new RegExp(
        /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/
      )
    ).allow(""),
    alt: Joi.string().min(2).max(256).allow(""),
  }),
  address: Joi.object().required().keys({
    state: Joi.string().min(2).max(256).allow(""),
    country: Joi.string().min(2).max(256).required(),
    city: Joi.string().min(2).max(256).required(),
    street: Joi.string().min(2).max(256).required(),
    houseNumber: Joi.number().min(1).required(),
    zip: Joi.number().allow("", 0),
  }),
  //bizNumber: Joi.number().min(1000000).max(9999999).allow(""),
  user_id: Joi.string().hex().length(24),*/
});

const validateCardSchema = (userInput) => {
  return createCardSchema.validateAsync(userInput); 
};




module.exports = {
  validateCardSchema,
  
};

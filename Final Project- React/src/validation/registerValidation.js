import Joi from "joi";

import validation from "./validation";

const registerSchema = Joi.object({
    name: Joi.object()
    .keys({
      firstName: Joi.string().min(2).max(256).label("First Name").required(),
      middleName: Joi.string().min(2).max(256).label("Middle Name").allow(""),
      lastName: Joi.string().min(2).max(256).label("Last Name").required(),
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
    password: Joi.string()
      .regex(
        new RegExp(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]{4})(?=.*[!@%$#^&*-_*]).{8,}$/
        )
      )
      .required(),
    image: Joi.object().keys({
      url: Joi.string().regex(new RegExp(/(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/)).label("Image Url").allow(""),
      alt: Joi.string().min(2).max(256).required().label("Image Alt").allow(""),
        }).allow(""), 
    address: Joi.object()
      .keys({
        state: Joi.string().min(2).max(256).label("State").allow(""),
        country: Joi.string().min(2).max(256).label("Country").required(),
        city: Joi.string().min(2).max(256).label("City").required(),
        street: Joi.string().min(2).max(256).label("Street").required(),
        houseNumber: Joi.number().min(1).max(256).label("House Number").required(),
        zip: Joi.number().label("Zip").allow(null).allow(''),
      })
      .required(),
    isAdmin: Joi.boolean(),
    //isBusiness: Joi.boolean().required(),
    /* firstName: Joi.string().min(2).max(255).label('First name').required(),
    middleName: Joi.string().min(2).max(255).label('Middle name').allow(""),
    lastName: Joi.string().min(2).max(255).label('Last name').required(),
    phone: Joi.string().min(9).max(14).label('Phone').required(),
    email: Joi.string().email({ tlds: { allow: false } }).required(),
    //password: Joi.string().min(6).max(20).pattern(new RegExp('^[a-zA-Z0-9]{6,20}$')).required(),
    password: Joi.string()
    .min(6)
    .max(20)
    .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{6,20}$'))
    .required()
    .messages({
        'string.pattern.base': 'Password must include uppercase letters, lowercase letters and numbers.',
        'any.required': 'Password is required.',
        'string.min': 'Password must be at least {#limit} characters long.',
        'string.max': 'Password must be at most {#limit} characters long.',
    }),

    imageUrl: Joi.string().min(6).max(1024).label('Image URL').allow(""),
    imageAlt: Joi.string().min(6).max(256).label('Image Alt').allow(""),
    state: Joi.string().min(2).max(256).allow(""),
    country: Joi.string().min(2).max(256).required(),
    city: Joi.string().min(2).max(256).required(),
    street: Joi.string().min(2).max(256).required(),
    houseNumber: Joi.string().min(1).max(256).label('House number').required(),
    zipCode: Joi.number().min(1).max(256).label('ZIP').allow(""),
    biz: Joi.boolean(), */
});

const validateRegisterSchema = (userInput) =>
  validation(registerSchema, userInput);

export default validateRegisterSchema;

//{ tlds: { allow: false } }

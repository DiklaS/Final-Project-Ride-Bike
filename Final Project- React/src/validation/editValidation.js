import Joi from "joi";

import validation from "./validation";

const editItemSchema = Joi.object({
    item: Joi.string().min(2).max(256).required(),
    company: Joi.string().min(2).max(256).required(),
    price: Joi.number().min(10).max(100000).required(),
    size: Joi.string().min(1).max(256).allow(""),
    location: Joi.string().min(2).max(256).required(),
    contactName: Joi.string().min(2).max(256).required(),
    phone: Joi.string().regex(new RegExp(/0[0-9]{1,2}\-?\s?[0-9]{3}\s?[0-9]{4}/)).required(),
    url: Joi.string().regex(
        new RegExp(

    /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,}|imgs\/[^\s]+\.(?:jpg|jpeg|png|gif|bmp))/i        )
      ).required(),
    alt: Joi.string().min(2).max(256).required(),
    email: Joi.string().regex(
      new RegExp(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/)
    ).allow("")
});

const editItemParamsSchema = Joi.object({
  id: Joi.string().min(1).required(),
});

const validateItemSchema = (userInput) => validation(editItemSchema, userInput);

const validateEditItemParamsSchema = (userInput) =>
  validation(editItemParamsSchema, userInput);

export { validateEditItemParamsSchema };

export default validateItemSchema;

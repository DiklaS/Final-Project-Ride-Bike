import Joi from "joi";

import validation from "./validation";

const profileSchema = Joi.object({
    
    firstName: Joi.string().min(2).max(255).label('First name').required(),
    middleName: Joi.string().min(2).max(255).label('Middle name').allow(""),
    lastName: Joi.string().min(2).max(255).label('Last name').required(),
    phone: Joi.string().min(7).max(14).label('Phone').required(),
    email: Joi.string().email({ tlds: { allow: false } }).required(),
    imageUrl: Joi.string().min(6).max(1024).label('Image URL').allow(""),
    imageAlt: Joi.string().min(2).max(256).label('Image Alt').allow(""),
    state: Joi.string().min(2).max(256).allow(""),
    country: Joi.string().min(2).max(256).required(),
    city: Joi.string().min(2).max(256).required(),
    street: Joi.string().min(2).max(256).required(),
    houseNumber: Joi.number().min(1).max(256).label('House number').required(),
    zipCode: Joi.number().label("Zip").allow(null).allow(''),
    isAdmin: Joi.boolean(), 
});

const validateProfileSchema = (userInput) =>
  validation(profileSchema, userInput);

export default validateProfileSchema;

//{ tlds: { allow: false } }

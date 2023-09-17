const mongoose = require("mongoose");
const Image = require("./Image");
const Address = require("./Address");
const {DEFAULT_STRING_SCHEMA, DEFAULT_STRING_SCHEMA_REQUIRED} = require("./helpers/mongooseValidation");

const itemSchema = new mongoose.Schema({
  item: DEFAULT_STRING_SCHEMA_REQUIRED,
  company: DEFAULT_STRING_SCHEMA_REQUIRED,
  price:{
    type: Number,
    required: true,
    trim: true,
    minLength: 2,
    default: 0
  },
  size: DEFAULT_STRING_SCHEMA,
  location:DEFAULT_STRING_SCHEMA_REQUIRED,
  contactName:DEFAULT_STRING_SCHEMA_REQUIRED,
  phone: {
    type: String,
    required: true,
    match: RegExp(/0[0-9]{1,2}\-?\s?[0-9]{3}\s?[0-9]{4}/),
  },
  email: {
    type: String,
    require: true,
    match: RegExp(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/),
    lowercase: true,
    trim: true,
    //unique: true,
  },
  image: Image,


  details: { ...DEFAULT_STRING_SCHEMA, maxLength: 1024 },
  bizNumber: {
    type: Number,
    minLength: 7,
    maxLength: 7,
    required: true,
    trim: true,
  },
  likes: [String],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
  },
});

const Item = mongoose.model("items", itemSchema);

module.exports = Item;

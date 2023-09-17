const URL = {
  type: String,
  match: /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,}|imgs\/[^\s]+\.(?:jpg|jpeg|png|gif|bmp)|\/uploads\/[^\s]+\.(?:jpg|jpeg|png|gif|bmp))/i,
  trim: true,
};

const DEFAULT_STRING_SCHEMA = {
  type: String,
  maxLength: 256,
  trim: true,
};

const DEFAULT_STRING_SCHEMA_REQUIRED = {
  ...DEFAULT_STRING_SCHEMA,
  minLength: 2,
  required: true,
};

module.exports = {
  URL,
  DEFAULT_STRING_SCHEMA,
  DEFAULT_STRING_SCHEMA_REQUIRED,
};

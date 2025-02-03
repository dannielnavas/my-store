const Joi = require('joi');

const id = Joi.string().uuid();
const name = Joi.string().alphanum().min(3).max(15);
const price = Joi.number().integer().min(10).max(1000);

const createProductSchema = Joi.object({
  name: name.required(),
  price: price.required(),
  Image: Joi.string(),
  isBlock: Joi.boolean().default(false),
});

const updateProductSchema = Joi.object({
  name: name,
  price: price,
  Image: Joi.string(),
  isBlock: Joi.boolean(),
});

const getProductSchema = Joi.object({
  id: id.required(),
});

module.exports = {
  createProductSchema,
  updateProductSchema,
  getProductSchema,
};

const Joi = require('joi');

const id = Joi.string().alphanum();
const name = Joi.string().alphanum().min(3).max(15);
const price = Joi.number().integer().min(10).max(1000);
const image = Joi.string().uri();
const isBlock = Joi.boolean().default(false);

const createProductSchema = Joi.object({
  name: name.required(),
  price: price.required(),
  image: Joi.required(),
  isBlock: Joi.required(),
});

const updateProductSchema = Joi.object({
  name: name,
  price: price,
  image: image,
  isBlock: isBlock,
});

const getProductSchema = Joi.object({
  id: id.required(),
});

module.exports = {
  createProductSchema,
  updateProductSchema,
  getProductSchema,
};

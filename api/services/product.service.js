const faker = require('@faker-js/faker');
const boom = require('@hapi/boom');

const { models } = require('./../lib/sequelize');

class ProductsService {
  constructor() {
    //   this.products = [];
    //   this.generate();
    // }
    // generate() {
    //   const limit = 100;
    //   for (let index = 0; index < limit; index++) {
    //     this.products.push({
    //       id: 1 + index,
    //       name: faker.commerce.productName(),
    //       price: parseInt(faker.commerce.price(), 10),
    //       Image: faker.image.urlPicsumPhotos(200, 200),
    //       isBlock: faker.datatype.boolean(),
    //     });
    //   }
  }

  async create(data) {
    const newProduct = await models.Product.create(data);
    return newProduct;
  }

  async find() {
    const products = await models.Product.findAll({
      include: ['category'], // trae los datos de categories
    });
    return products;
  }

  async findOne(id) {
    const product = await models.Product.findByPk(id, {
      include: ['category'],
    });
    if (!product) {
      throw boom.notFound('product not found');
    }
    if (product.isBlock) {
      throw boom.conflict('product is block');
    }
    return product;
  }

  async update(id, changes) {
    const index = await models.Product.findByPk(id);
    if (index === -1) {
      throw boom.notFound('product not found');
    }
    const product = this.products[index];
    this.products[index] = {
      ...product,
      ...changes,
    };
    return this.products[index];
  }

  async delete(id) {
    const index = await models.Product.findByPk(id);
    if (index === -1) {
      throw boom.notFound('product not found');
    }
    await models.Product.destroy({
      where: {
        id,
      },
    });
    return { id };
  }
}

module.exports = ProductsService;

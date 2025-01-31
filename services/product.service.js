const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom');

class ProductsServices {
  constructor() {
    this.products = [];
    this.generate();
  }

  generate() {
    const limit = 100;
    for (let i = 0; i < limit; i++) {
      this.products.push({
        id: faker.string.ulid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        Image: faker.image.urlPicsumPhotos(200, 200),
        isBlock: faker.datatype.boolean(),
      });
    }
  }

  async create(data) {
    const newProduct = {
      id: faker.string.ulid(),
      ...data,
    };
    this.products.push(newProduct);
    return newProduct;
  }

  async find() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.products);
      }, 5000);
    });
    // return this.products;
  }

  async findOne(id) {
    // const name = this.getTotal();
    const product = this.products.find((item) => item.id === id);
    if (!product) {
      throw boom.notFound('Product not found');
    }
    if (product.isBlock) {
      throw boom.conflict('Product is blocked');
    }
    return product;
  }

  async update(id, data) {
    const index = this.products.findIndex((item) => item.id === id);
    if (index === -1) {
      throw boom.notFound('Product not found');
    }
    this.products[index] = {
      ...this.products[index],
      ...data,
    };
    return this.products[index];
  }

  async delete(id) {
    const index = this.products.findIndex((item) => item.id === id);
    if (index === -1) {
      throw boom.notFound('Product not found');
    }
    this.products.splice(index, 1);
    return {
      message: 'Deleted',
      id,
    };
  }
}

module.exports = ProductsServices;

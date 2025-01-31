const { faker } = require('@faker-js/faker');

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
      });
    }
  }

  create(data) {
    const newProduct = {
      id: faker.string.ulid(),
      ...data,
    };
    this.products.push(newProduct);
    return newProduct;
  }

  find() {
    return this.products;
  }

  findOne(id) {
    return this.products.find((item) => item.id === id);
  }

  update(id, data) {
    const index = this.products.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new Error('Product not found');
    }
    this.products[index] = {
      ...this.products[index],
      ...data,
    };
    return this.products[index];
  }

  delete(id) {
    const index = this.products.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new Error('Product not found');
    }
    this.products.splice(index, 1);
    return {
      message: 'Deleted',
      id,
    };
  }
}

module.exports = ProductsServices;

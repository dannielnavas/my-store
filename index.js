'use strict';

const express = require('express');
const { faker } = require('@faker-js/faker');

const app = express();

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.get('/nueva-ruta', (req, res) => {
  res.send('New endpoint');
});

app.get('/users', (req, res) => {
  const { limit, offset } = req.query;
  if (limit && offset) {
    res.json({
      limit,
      offset,
    });
  }
  res.json({
    message: 'User endpoint',
  });
});

app.get('/products', (req, res) => {
  const { size } = req.query;
  const limit = size || 10;
  const products = [];
  for (let i = 0; i < limit; i++) {
    products.push({
      id: i,
      name: faker.commerce.productName(),
      price: parseInt(faker.commerce.price(), 10),
      Image: faker.image.urlPicsumPhotos(200, 200),
    });
  }
  res.json(products);
});

// Lo especifico debe ir antes de lo dinamico para que no se confunda con el id
app.get('/products/filter', (req, res) => {
  res.send('Filter endpoint');
});

app.get('/products/:id', (req, res) => {
  const { id } = req.params;
  res.json({
    id,
    name: `Product ${id}`,
    price: 100 * id,
  });
});

app.get('/categories/:categoryId/products/:productId', (req, res) => {
  const { categoryId, productId } = req.params;
  res.json({
    categoryId,
    productId,
  });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

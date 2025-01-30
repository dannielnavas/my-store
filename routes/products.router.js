'use strict';

const express = require('express');
const { faker } = require('@faker-js/faker');

const router = express.Router();

router.get('/', (req, res) => {
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
router.get('/filter', (req, res) => {
  res.send('Filter endpoint');
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  res.json({
    id,
    name: `Product ${id}`,
    price: 100 * id,
  });
});

router.post('/', (req, res) => {
  const body = req.body;
  res.json({
    message: 'Created',
    data: body,
  });
});

module.exports = router;

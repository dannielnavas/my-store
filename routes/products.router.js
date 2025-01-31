'use strict';

const express = require('express');
const ProductsServices = require('./../services/product.service');

const router = express.Router();
const service = new ProductsServices();

router.get('/', (req, res) => {
  const products = service.find();
  res.json(products);
});

// Lo especifico debe ir antes de lo dinamico para que no se confunda con el id
router.get('/filter', (req, res) => {
  res.send('Filter endpoint');
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const product = service.findOne(id);
  res.json(product);
});

router.post('/', (req, res) => {
  const body = req.body;
  const newProduct = service.create(body);
  res.json(newProduct);
});
// recive todos los datos para actualizar
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const body = req.body;
  const product = service.update(id, body);
  res.json(product);
});

// recive de forma parcial los datos
router.patch('/:id', (req, res) => {
  const { id } = req.params;
  const body = req.body;
  const product = service.update(id, body);
  res.json(product);
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const rta = service.delete(id);
  res.json(rta);
});

module.exports = router;

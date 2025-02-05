const UserService = require('../services/user.service');
const express = require('express');

const router = express.Router();

const service = new UserService();

router.get('/', async (req, res) => {
  const users = await service.find();
  res.json(users);
});

router.get('/users', (req, res) => {
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

module.exports = router;

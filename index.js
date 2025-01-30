'use strict';

const express = require('express');
const routerApi = require('./routes');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.get('/nueva-ruta', (req, res) => {
  res.send('New endpoint');
});

routerApi(app);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

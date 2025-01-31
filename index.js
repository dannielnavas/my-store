'use strict';

const express = require('express');
const routerApi = require('./routes');
const { logErrors, errorHandler } = require('./middlewares/error.handler');

const app = express();

app.use(express.json()); // implementar para los post

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.get('/nueva-ruta', (req, res) => {
  res.send('New endpoint');
});

routerApi(app);
// se ejecuta despues del routerApi
// el orden es importante por lo que el errorHandler debe finalizar
app.use(logErrors);
app.use(errorHandler);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

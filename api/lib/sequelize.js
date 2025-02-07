const { Sequelize } = require('sequelize');

const { config } = require('./../../config/config');
const setupModels = require('./../../db/models');

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

const sequelize = new Sequelize(URI, {
  dialect: 'postgres', // mysql, sqlite, postgres, mssql
  logging: true,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

setupModels(sequelize);

// sequelize.sync(); // aqui crea la tabla esto no debe pasar en produccion

module.exports = sequelize;

// install mysql2 como driver de mysql
// pnpm add mysql2
// configura las variables de entorno

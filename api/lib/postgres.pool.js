const { Pool } = require('pg');

const pool = new Pool({
  host: 'dpg-cuh0kvq3esus73fiohg0-a.oregon-postgres.render.com',
  port: 5432,
  user: 'danniel',
  password: 'Mi9VnaVDvPS1VupPCDeJz6ygidWjwWth',
  database: 'store_f9op',
  ssl: {
    rejectUnauthorized: false,
  },
});

module.exports = pool;

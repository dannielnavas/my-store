const boom = require('@hapi/boom');

// const getConnection = require('../lib/postgres');

const pool = require('../lib/postgres.pool');

class UserService {
  constructor() {
    this.pool = pool;
    this.pool.on('error', (err, client) => {
      console.error('Unexpected error on idle client', err);
    });
  }

  async create() {}

  // async find() {
  //   const client = await getConnection();
  //   const result = await client.query('SELECT * FROM users');
  //   return result.rows;
  // }

  async find() {
    const query = 'SELECT * FROM users';
    const result = await this.pool.query(query);
    return result.rows;
  }

  async update() {}

  async delete() {}
}
module.exports = UserService;

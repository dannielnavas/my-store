const boom = require('@hapi/boom');

const getConnection = require('../lib/postgres');

class UserService {
  constructor() {}

  async create() {}

  async find() {
    const client = await getConnection();
    const result = await client.query('SELECT * FROM users');
    return result.rows;
  }

  async update() {}

  async delete() {}
}
module.exports = UserService;

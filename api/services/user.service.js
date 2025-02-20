const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');

// const getConnection = require('../lib/postgres');

// const pool = require('../lib/postgres.pool');
// const sequelize = require('../lib/sequelize');
const { models } = require('../lib/sequelize');

class UserService {
  constructor() {
    // this.pool = pool;
    // this.pool.on('error', (err, client) => {
    //   console.error('Unexpected error on idle client', err);
    // });
  }

  // async find() {
  //   const client = await getConnection();
  //   const result = await client.query('SELECT * FROM users');
  //   return result.rows;
  // }

  // async find() {
  //   const query = 'SELECT * FROM users';
  //   const result = await this.pool.query(query);
  //   return result.rows;
  // }

  // async find() {
  //   const query = 'SELECT * FROM users';
  //   const [data, metadata] = await sequelize.query(query);
  //   return data;
  // }

  async find() {
    const client = models.User.findAll({
      include: ['customer'], // incluir la relacion con user de forma anidada
    });
    return client;
  }

  async create(data) {
    const hash = await bcrypt.hash(data.password, 10);
    const newUser = await models.User.create({
      ...data,
      password: hash,
    });
    delete newUser.dataValues.password;
    return newUser;
  }

  async findOne(id) {
    const user = await models.User.findByPk(id);
    if (!user) {
      throw boom.notFound('user not found');
    }
    return user;
  }

  async update(id, changes) {
    const user = await this.findOne(id);
    const rta = await user.update(changes);
    return rta;
  }

  async delete(id) {
    const user = await this.findOne(id);
    await user.destroy();
    return { id };
  }
}
module.exports = UserService;

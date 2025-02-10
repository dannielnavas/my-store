const { Model, DataTypes, Sequelize } = require('sequelize');

const { USER_TABLE } = require('./user.model');

const CUSTOMER_TABLE = 'customers';

const CustomerSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  lastName: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'last_name',
  },
  phone: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW,
  },
  // Aquí se define la relación con la tabla de usuarios
  userId: {
    field: 'user_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    unique: true, // esto permite que se a unico
    references: {
      // User belongsTo Customer 1:1
      model: USER_TABLE, // Name of the table
      key: 'id', // Column name in the table to reference
    },
    onUpdate: 'CASCADE', // If Customer is updated, update User
    onDelete: 'SET NULL', // If Customer is deleted, set User to null
  },
};

class Customer extends Model {
  // Aqui se define las relaciones
  static associate(models) {
    // el as es el nombre de la relacion
    this.belongsTo(models.User, { as: 'user' }); // 1:1 Customer belongsTo User
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: CUSTOMER_TABLE,
      modelName: 'Customer',
      timestamps: false,
    };
  }
}

module.exports = { Customer, CustomerSchema, CUSTOMER_TABLE };

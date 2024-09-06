'use strict';
import { v4 as uuidv4 } from 'uuid'; // Import uuidv4 from the uuid package


const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class todo extends Model {


    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

    //relationship with user table
      todo.belongsTo(models.user, {
        foreignKey: 'user_id',
        as: 'user'
      });

    }

  }
  todo.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: uuidv4, // Automatically generate UUID
      primaryKey: true
    },
    //user id cant be null
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'todo',
    underscored: true,
  });
  return todo;
};
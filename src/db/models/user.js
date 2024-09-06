'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {


    //relationship with todos table
    static associate(models) {
      user.hasMany(models.todo, {
        foreignKey: 'user_id',
        as: 'todos'
      });
    }

    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  user.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    // add nickname nullable for users who don't want to set a nickname
    nickname: DataTypes.STRING

  }, {
    sequelize,
    modelName: 'user',
    underscored: true,
  });
  return user;
};
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Relation, {
        foreignKey: 'postId',
        as: 'post',
        onDelete: 'CASCADE'
      });
      User.hasMany(models.Relation, {
        foreignKey: 'commentsId',
        as: 'comments',
        onDelete: 'CASCADE'
      });
    }
  };
  User.init({
    name: DataTypes.STRING,
    lastName: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING,
    city: DataTypes.STRING,
    email: DataTypes.STRING,
    isAdmin: DataTypes.BOOLEAN,
    isActive: DataTypes.BOOLEAN,
    token: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
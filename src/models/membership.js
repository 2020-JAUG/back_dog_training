'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class membership extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  membership.init({
    userId: DataTypes.INTEGER,
    common_wallId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'membership',
  });
  return membership;
};
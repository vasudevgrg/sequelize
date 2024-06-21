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
      User.hasMany(models.Address,{
        foreignKey:'user_id'
      });
      User.belongsToMany(models.Payment,{
        through:'UserPayment',
        foreignKey: 'user_id',
        otherKey: 'payment_id'
      });
      User.belongsTo(models.Section,{
        foreignKey:'section_id'
      })
    }
  }
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    profile_pic: DataTypes.STRING,
    qualification: DataTypes.STRING,
    section_id:DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User',
    tableName:'User'
  });
  return User;
};
'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require('bcryptjs');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasOne(models.Category, {foreignKey: 'InstructorId'});
      User.hasMany(models.Course, {foreignKey: 'InstructorId'});  
      User.belongsToMany(models.Course, {as: 'students',  through: 'UserCourses'});
    }

  }
  User.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });

  User.beforeCreate((el) =>{
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(el.password, salt);
    el.password = hash;
  });

  return User;
};
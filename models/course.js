'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Course extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Course.belongsTo(models.Category);  //category 
      Course.belongsTo(models.User, {as: 'instructor', foreignKey: 'InstructorId'});  //instructor
      Course.belongsToMany(models.User, {as: 'students'});
    }
  }
  Course.init({
    title: DataTypes.STRING,
    duration: DataTypes.INTEGER,
    description: DataTypes.STRING,
    CategoryId: DataTypes.INTEGER,
    InstructorId: DataTypes.INTEGER,
    videoUrl: DataTypes.STRING  //added
  }, {
    sequelize,
    modelName: 'Course',
  });
  return Course;
};
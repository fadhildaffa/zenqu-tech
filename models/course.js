'use strict';
const {
  Model
} = require('sequelize');
const helper = require('../helper');
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
      Course.belongsToMany(models.User, {as: 'students', through: 'UserCourses'});
    }

    get formatDuration(){
      return helper.formattedMinutes(this.duration);
    }

  }
  Course.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Course Title can not be Empty!"
        },
        notEmpty: {
          msg: "Course Title can not be Empty!"
        }
      }
    },


    duration: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Duration can not be Empty!"
        },
        notEmpty: {
          msg: "Duration Title can not be Empty!"
        }, 
        isNumeric: {
          msg: "Duration can only be Numbers!"
        }
      }
    },


    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Description can not be Empty!"
        },
        notEmpty: {
          msg: "Description can not be Empty!"
        }
      }
    },


    CategoryId: DataTypes.INTEGER,

    InstructorId: DataTypes.INTEGER,


    // {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    //   validate: {
    //     notNull: {
    //       msg: "CategoryId can not be Empty!"
    //     },
    //     notEmpty: {
    //       msg: "CategoryId Title can not be Empty!"
    //     }, isNumeric: {
    //       msg: "CategoryId can only be Numbers!"
    //     }
    //   }
    // },


    videoUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Video Url can not be Empty!"
        },
        notEmpty: {
          msg: "Video Url can not be Empty!"
        }, isUrl: {
          msg: "Video Url can only be  URL format!"
        }
      }
    },
    


  }, {
    sequelize,
    modelName: 'Course',
  });
  return Course;
};
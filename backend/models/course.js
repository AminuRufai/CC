// models/course.js
module.exports = (sequelize, DataTypes) => {
  const Course = sequelize.define('Course', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    level: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  });

  Course.associate = function(models) {
    Course.hasMany(models.Module, { as: 'modules', foreignKey: 'courseId' });
  };

  return Course;
};

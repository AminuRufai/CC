// models/module.js
module.exports = (sequelize, DataTypes) => {
  const Module = sequelize.define('Module', {
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
    contentType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    courseId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  });

  Module.associate = function(models) {
    Module.belongsTo(models.Course, { as: 'course', foreignKey: 'courseId' });
    Module.hasMany(models.Content, { as: 'contents', foreignKey: 'moduleId' });
    Module.hasMany(models.Quiz, { as: 'quizzes', foreignKey: 'moduleId' });
  };

  return Module;
};

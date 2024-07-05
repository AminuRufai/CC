// models/quiz.js
module.exports = (sequelize, DataTypes) => {
  const Quiz = sequelize.define('Quiz', {
    question: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    options: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    correctAnswer: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    moduleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  });

  Quiz.associate = function(models) {
    Quiz.belongsTo(models.Module, { as: 'module', foreignKey: 'moduleId' });
  };

  return Quiz;
};

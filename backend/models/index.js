const Sequelize = require('sequelize');
const sequelize = require('../db');
const UserModel = require('./user');
const CourseModel = require('./course');
const ModuleModel = require('./module');
const ContentModel = require('./content');
const QuizModel = require('./quiz');

// Initialize models
const User = UserModel(sequelize, Sequelize.DataTypes);
const Course = CourseModel(sequelize, Sequelize.DataTypes);
const Module = ModuleModel(sequelize, Sequelize.DataTypes);
const Content = ContentModel(sequelize, Sequelize.DataTypes);
const Quiz = QuizModel(sequelize, Sequelize.DataTypes);

// Define associations
Course.associate = models => {
  Course.hasMany(Module, { as: 'modules', foreignKey: 'courseId' });
};
Module.associate = models => {
  Module.belongsTo(Course, { foreignKey: 'courseId' });
  Module.hasMany(Content, { as: 'contents', foreignKey: 'moduleId' });
  Module.hasMany(Quiz, { as: 'quizzes', foreignKey: 'moduleId' });
};
Content.associate = models => {
  Content.belongsTo(Module, { foreignKey: 'moduleId' });
};
Quiz.associate = models => {
  Quiz.belongsTo(Module, { foreignKey: 'moduleId' });
};

// Apply associations
Object.keys(sequelize.models).forEach(modelName => {
  if (sequelize.models[modelName].associate) {
    sequelize.models[modelName].associate(sequelize.models);
  }
});

sequelize.sync().then(() => {
  console.log('Database & tables created!');
});

module.exports = {
  User,
  Course,
  Module,
  Content,
  Quiz,
};

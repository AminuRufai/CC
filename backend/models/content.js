// models/content.js
module.exports = (sequelize, DataTypes) => {
  const Content = sequelize.define('Content', {
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    moduleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  });

  Content.associate = function(models) {
    Content.belongsTo(models.Module, { as: 'module', foreignKey: 'moduleId' });
  };

  return Content;
};

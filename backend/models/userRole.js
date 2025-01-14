module.exports = (sequelize, DataTypes) => {
    const UserRole = sequelize.define('UserRole', {
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Users',
          key: 'id'
        }
      },
      roleId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Roles',
          key: 'id'
        }
      }
    });
  
    return UserRole;
  };
  
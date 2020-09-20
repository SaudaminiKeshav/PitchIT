module.exports = function(sequelize, DataTypes) {

    var Adventure = sequelize.define("Adventure", {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        len: [1]
      },
      date: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1]
        }
      },
      location: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1]
        }
      },
      campers: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      items: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      completed: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      }
    });
  
    Adventure.associate = function(models) {
      Adventure.belongsTo(models.User, {
        foreignKey: {
          allowNull: false
        }
      });
    };
  
    return Adventure;
  };
  
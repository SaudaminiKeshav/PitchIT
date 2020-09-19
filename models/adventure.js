module.exports = function(sequelize, DataTypes) {

    var Adventure = sequelize.define("Adventure", {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        len: [1]
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
        len: [1]
      },
      location: {
        type: DataTypes.STRING,
        allowNull: false,
        len: [1]
      },
      campers: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      items: {
        type: DataTypes.TEXT,
        allowNull: true,
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
  
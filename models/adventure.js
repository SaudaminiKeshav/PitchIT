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
        type: DataTypes.STRING,
        allowNull: true,
      },
      items: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      completed: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      review: {
        type: DataTypes.STRING,
        allowNull: true,
        len: [1]
      },
      parkImgUrl: {
        type: DataTypes.STRING,
        allowNull: true,
        len: [1]
      },
      parkWebUrl: {
        type: DataTypes.STRING,
        allowNull: true,
        len: [1]
      }
    });
  
    // Adventure.associate = function(models) {
    //   Adventure.belongsTo(models.User, {
    //     foreignKey: {
    //       allowNull: false
    //     }
    //   });
    // };
  
    return Adventure;
  };
  
module.exports = function(sequelize, DataTypes) {

    var User = sequelize.define("User", {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            len: [1, 15]
          },
          email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
              len: [1],
              isEmail: true
            }
          },
          password: {
            type: DataTypes.Date,
            allowNull: false,
            validate: {
              len: [8, 16]
            }
          }
    });
  
    User.associate = function(models) {

      User.hasMany(models.Adventure, {
        onDelete: "cascade"
        });
    };
  
    return User;
  };
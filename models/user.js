module.exports = function(sequelize, DataTypes) {

    var User = sequelize.define("User", {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            len: [1, 10]
          },
          password: {
            type: DataTypes.Date,
            allowNull: false,
            len: [8, 16]
          }
    });
  
    User.associate = function(models) {

      User.hasMany(models.Adventure, {
        onDelete: "cascade"
        });
    };
  
    return User;
  };
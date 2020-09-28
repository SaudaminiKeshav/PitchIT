module.exports = function(sequelize, DataTypes) {

  var Nationalpark = sequelize.define("Nationalpark", {
    parkcode: {
      type: DataTypes.STRING,
      allowNull: false,
      len: [1]
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      len: [1]
    },
    state: {
      type: DataTypes.STRING,
      allowNull: true,
      len: [1]
    },
    image0: {
      type: DataTypes.STRING,
      allowNull: true,
      len: [1]
    },
    infoUrl: {
      type: DataTypes.STRING,
      allowNull: true,
      len: [1]
    }
  });

  return Nationalpark;
};
  
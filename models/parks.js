module.exports = function(sequelize, DataTypes) {

  var Nationalpark = sequelize.define("Nationalpark", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      len: [1]
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
      len: [1]
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      len: [1]
    },
    price: {
      type: DataTypes.STRING,
      allowNull: false,
      len: [1]
    },
    image0: {
      type: DataTypes.STRING,
      allowNull: false,
      len: [1]
    },
    image1: {
      type: DataTypes.STRING,
      allowNull: false,
      len: [1]
    },
    image2: {
      type: DataTypes.STRING,
      allowNull: false,
      len: [1]
    },
    image3: {
      type: DataTypes.STRING,
      allowNull: false,
      len: [1]
    },
    weatherInfo: {
      type: DataTypes.STRING,
      allowNull: false,
      len: [1]
    },
    infoUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      len: [1]
    }
  });

  return Nationalpark;
};
  
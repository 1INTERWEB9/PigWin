const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const apuestas = sequelize.define(
    "apuestas",
    {
      id_apuesta: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      MontoApuesta: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    { timestamps: false }
  );

  return apuestas;
};

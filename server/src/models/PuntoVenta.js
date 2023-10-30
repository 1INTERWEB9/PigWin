const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const punto_venta = sequelize.define(
    "punto_venta",
    {
      id_punto_venta: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      NombrePuntoVenta: {
        type: DataTypes.STRING(45),
        allowNull: false,
      },
      AdministradorPuntoVenta: {
        type: DataTypes.STRING(45),
        allowNull: false,
      },
    },
    { timestamps: false }
  );

  return punto_venta;
};

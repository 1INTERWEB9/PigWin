const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const cliente = sequelize.define(
    "cliente",
    {
      id_cliente: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      NumeroDocumento: {
        type: DataTypes.STRING(25),
        allowNull: false,
      },
      PrimerNombre: {
        type: DataTypes.STRING(25),
        allowNull: false,
      },
      SegundoNombre: {
        type: DataTypes.STRING(25),
        allowNull: true,
      },
      PrimerApellido: {
        type: DataTypes.STRING(25),
        allowNull: false,
      },
      SegundoApellido: {
        type: DataTypes.STRING(25),
        allowNull: true,
      },
    },
    { timestamps: false }
  );

  return cliente;
};

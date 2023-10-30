const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const contacto_cliente = sequelize.define(
    "contacto_cliente",
    {
      id_contacto_cliente: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      ValorContacto: {
        type: DataTypes.STRING(45),
        allowNull: false,
      },
    },
    { timestamps: false }
  );

  return contacto_cliente;
};

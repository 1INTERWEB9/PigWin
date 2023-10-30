const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const catalogo = sequelize.define(
    "catalogo",
    {
      id_catalogo: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      NombreCatalogo: {
        type: DataTypes.STRING(45),
        allowNull: false,
      },
    },
    { timestamps: false }
  );

  return catalogo;
};

const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const estadisticas_equipo = sequelize.define(
    "estadisticas_equipo",
    {
      id_estadisticas_equipo: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      ValorApartado: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
    },
    { timestamps: false }
  );

  return estadisticas_equipo;
};

const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const partido = sequelize.define(
    "partido",
    {
      id_partido: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      FechaPartido: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      GanadorPartido: {
        type: DataTypes.ENUM("Visitante", "Local", "Empate"),
      },
    },
    { timestamps: false }
  );

  return partido;
};

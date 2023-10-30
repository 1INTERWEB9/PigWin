const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const equipo = sequelize.define(
    "equipo",
    {
      id_equipo: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      NombreEquipo: {
        type: DataTypes.STRING(45),
        allowNull: false,
      },
    },
    { timestamps: false }
  );

  return equipo;
};

const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const ticket = sequelize.define(
    "ticket",
    {
      id_ticket: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      FechaTicket: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    { timestamps: false }
  );

  return ticket;
};

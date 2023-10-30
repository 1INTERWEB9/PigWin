require("dotenv").config();
const { Sequelize } = require("sequelize");
const Model_catalogo = require("./models/Catalogo");
const Model_cliente = require("./models/Cliente");
const Model_contacto_cliente = require("./models/Contacto_cliente");
const Model_equipo = require("./models/Equipo");
const Model_estadisticas_equipo = require("./models/Estadisticas_equipo");
const Model_partido = require("./models/Partido");
const Model_punto_venta = require("./models/PuntoVenta");
const Model_ticket = require("./models/Ticket");
const Model_Apuesta = require("./models/Apuesta");

const { NAME_DATABASE, USER_DATABASE, PASSWORD_DATABASE, HOST_DATABASE } =
  process.env;

const sequelize = new Sequelize(
  NAME_DATABASE,
  USER_DATABASE,
  PASSWORD_DATABASE,
  {
    host: HOST_DATABASE,
    dialect: "mysql",
    logging: false,
  }
);

Model_catalogo(sequelize);
Model_cliente(sequelize);
Model_contacto_cliente(sequelize);
Model_equipo(sequelize);
Model_estadisticas_equipo(sequelize);
Model_partido(sequelize);
Model_punto_venta(sequelize);
Model_ticket(sequelize);
Model_Apuesta(sequelize);

const {
  catalogo,
  cliente,
  contacto_cliente,
  equipo,
  estadisticas_equipo,
  partido,
  punto_venta,
  ticket,
  apuestas,
} = sequelize.models;

catalogo.hasOne(catalogo, {
  foreignKey: {
    name: "TipoCatalogo",
  },
});

catalogo.hasOne(cliente, {
  foreignKey: {
    name: "TipoDocumento",
  },
});

catalogo.hasOne(cliente, {
  foreignKey: {
    name: "MetodoDePago",
  },
});

catalogo.hasOne(cliente, {
  foreignKey: {
    name: "Sexo",
  },
});

cliente.hasOne(contacto_cliente, {
  foreignKey: {
    name: "Cliente",
  },
});

catalogo.hasOne(contacto_cliente, {
  foreignKey: {
    name: "TipoContacto",
  },
});

catalogo.hasOne(equipo, {
  foreignKey: {
    name: "Deporte",
  },
});

equipo.hasOne(estadisticas_equipo, {
  foreignKey: {
    name: "EquipoEstadisticas",
  },
});

catalogo.hasMany(estadisticas_equipo, {
  foreignKey: {
    name: "TipoApartado",
  },
});

catalogo.hasOne(partido, {
  foreignKey: {
    name: "EquipoLocal",
  },
});

catalogo.hasOne(partido, {
  foreignKey: {
    name: "EquipoVisitante",
  },
});

catalogo.hasOne(partido, {
  foreignKey: {
    name: "EquipoLocal",
  },
});

catalogo.hasOne(partido, {
  foreignKey: {
    name: "Deporte",
  },
});

punto_venta.hasMany(ticket, {
  foreignKey: {
    name: "PuntoVentaTicket",
  },
});

cliente.hasMany(ticket, {
  foreignKey: {
    name: "ClienteTicket",
  },
});

ticket.belongsToMany(partido, {
  through: { model: "apuestas", unique: false },
  foreignKey: {
    name: "TicketApuesta",
  },
});

partido.belongsToMany(ticket, {
  through: { model: "apuestas", unique: false },
  foreignKey: {
    name: "PartidoApuesta",
  },
});

equipo.hasMany(apuestas, {
  foreignKey: {
    name: "EquipoApuesta",
  },
});

module.exports = {
  ...sequelize.models,
  connection: sequelize,
};

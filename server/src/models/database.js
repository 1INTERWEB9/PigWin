const mysql = require("mysql2");
require("dotenv").config();
const connection = mysql.createConnection({
  host: process.env.HOST_DATABASE,
  user: process.env.USER_DATABASE,
  database: process.env.NAME_DATABASE,
});

connection.connect((errorConnection) => {
  // if (errorConnection) {
  //   console.error("Error con la conexion de la base de datos", errorConnection);
  // }
  // if (!errorConnection) {
  //   console.log("Conexion exitosa con la base de datos");
  // }
  errorConnection
    ? console.error("Error to database connection: ", errorConnection.code)
    : console.log("Sucefull connection with database");
});

module.exports = {
  connection,
};

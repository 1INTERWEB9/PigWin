const mysql = require("mysql2");
require("dotenv").config();

const connection = mysql.createPool({
  host: process.env.HOST_DATABASE,
  user: process.env.USER_DATABASE,
  database: process.env.NAME_DATABASE,
});

const validateConnection = () => {
  connection.getConnection((errorConnection, connection) => {
    if (!errorConnection) {
      console.log("Sucefull connection with database");
      connection.release();
    } else {
      console.error(
        "Error to database connection: ",
        errorConnection.code,
        " \nReconnect...."
      );
      setTimeout(validateConnection, 5000);
    }
  });
};

validateConnection();

module.exports = {
  connection,
};

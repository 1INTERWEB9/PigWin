const express = require("express");
const bodyParser = require("body-parser");

//Initialization express
const app = express();
app.set("port", 3000);

//Initialization middleware
app.use(express.json());
app.use(bodyParser.json());

app.listen(app.get("port"), () => {
  console.log(`Server online: http://localhost:${app.get("port")}`);
});

//Import routes
app.use("/query", require("./routes/queriesRoutes"));

//If a route doesn't exist
app.use((req, res) => {
  res.status(404).send("Ruta no existente");
});

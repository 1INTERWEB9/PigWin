const express = require("express");
const bodyParser = require("body-parser");

//Initialization express
const app = express();
app.set("port", 3000);

//Initialization middleware
app.use(bodyParser.json());

app.listen(app.get("port"), () => {
  console.log(`Server online: http://localhost:${app.get("port")}`);
});

//Import routes
app.use(require("./routes/indexRoutes"));
app.use(require("./routes/queries"));

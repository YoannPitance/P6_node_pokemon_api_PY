const express = require("express");
const morgan = require("morgan");
const favicon = require("serve-favicon");
const bodyParser = require("body-parser");
const sequelize = require("./src/db/sequelize");

const app = express();
const port = 3000;

app.use(favicon(__dirname + "/favicon.ico"));
app.use(morgan("dev"));
app.use(bodyParser.json());

sequelize.initDb();

//Ici nous placerons les futures points de terminaison
require("./src/routes/findAllPokemons")(app);
require("./src/routes/findPokemonByPk")(app);
require("./src/routes/createPokemon")(app);
require("./src/routes/updatePokemon")(app);
require("./src/routes/deletePokemon")(app);

app.listen(port, () =>
  console.log(
    `Notre application node est démarrée sur : http://localhost:${port}`
  )
);

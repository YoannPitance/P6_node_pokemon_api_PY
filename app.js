const express = require("express");
const morgan = require("morgan");
const favicon = require("serve-favicon");
const bodyParser = require("body-parser");
const sequelize = require("./src/db/sequelize");

const app = express();
const port = process.env.PORT || 3000;

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
require("./src/routes/login")(app);

// gestion des erreurs 404
app.use(({ res }) => {
  const message =
    "impossible de trouver la ressource demandée. Essayez une autre URL.";
  res.status(404).json({ message });
});

app.listen(port, () =>
  console.log(
    `Notre application node est démarrée sur : http://localhost:${port}`
  )
);

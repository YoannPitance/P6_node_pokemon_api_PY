const express = require("express");
const morgan = require("morgan");
const favicon = require("serve-favicon");
const bodyParser = require("body-parser");
const { Sequelize, DataTypes } = require("sequelize");
const { success, getUniqueId } = require("./helper.js");
let pokemons = require("./mock-pokemon");
const PokemonModel = require("./src/models/pokemon");

const app = express();
const port = 3000;

const sequelize = new Sequelize("pokedex", "root", "", {
  host: "localhost",
  dialect: "mariadb",
  dialectOptions: {
    timezone: "Etc/GMT-2",
  },
  looging: false,
});

sequelize
  .authenticate()
  .then((_) =>
    console.log("la connexion à la base de données a bien été établie.")
  )
  .catch((error) =>
    console.error(`Impossible de se connecter à la base de données ${error}`)
  );

const pokemon = PokemonModel(sequelize, DataTypes);

sequelize
  .sync({ force: true })
  .then((_) =>
    console.log("la connexion à la base de données a bien été sunchronisée.")
  );

app.use(favicon(__dirname + "/favicon.ico"));
app.use(morgan("dev"));
app.use(bodyParser.json());

app.get("/", (req, res) =>
  res.send("Hello Express encore et encore et encore  !")
);

app.get("/api/pokemons/", (req, res) => {
  const message = "Voici la liste des 12 pokémons";
  res.json(success(message, pokemons));
});

app.get("/api/pokemons/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const pokemon = pokemons.find((pokemon) => pokemon.id === id);
  const message = "Un pokemon a bien été trouvé";
  res.json(success(message, pokemon));
});

app.post("/api/pokemons", (req, res) => {
  const id = getUniqueId(pokemons);
  const pokemonCreated = { ...req.body, ...{ id: id, created: new Date() } };
  pokemons.push(pokemonCreated);
  const message = `Le pokemon ${pokemonCreated.name} a bien été créé`;
  res.json(success(message, pokemonCreated));
});

app.put("/api/pokemons/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const pokemonUpdated = { ...req.body, id: id };
  pokemons = pokemons.map((pokemon) => {
    return pokemon.id === id ? pokemonUpdated : pokemon;
  });
  const message = `Le pokemon ${pokemonUpdated.name} a bien été modifié.`;
  res.json(success(message, pokemonUpdated));
});

app.delete("/api/pokemons/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const pokemonDeleted = pokemons.find((pokemon) => pokemon.id === id);
  pokemons = pokemons.filter((pokemon) => pokemon.id !== id);
  const message = `Le pokemon ${pokemonDeleted.name} a bien été supprimé.`;
  res.json(success(message, pokemonDeleted));
});

app.listen(port, () =>
  console.log(
    `Notre application node est démarrée sur : http://localhost:${port}`
  )
);

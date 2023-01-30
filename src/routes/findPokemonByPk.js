const { Pokemon } = require("../db/sequelize");

module.exports = (app) => {
  app.get("/api/pokemons/:id", (req, res) => {
    Pokemon.findByPk(req.params.id)
      .then((pokemon) => {
        if (pokemon === null) {
          const message =
            "le pokemon demandé n'existe pas. Essayez avec un autre identifiant";
          return res.status(404).json({ messgae });
        }
        const message = "Un pokémon a bien été trouvé.";
        res.json({ message, data: pokemon });
      })
      .catch((error) => {
        const message =
          "ce pokemon n'a pas pu être récupéré. Réessayez dans quelques instants.";
        res.status(500).json({ message, data: error });
      });
  });
};

module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "Pokemon",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: `vous ne devez pas laisser ce champ vide` },
          notNull: { msg: `le nom est une propriété recquise` },
        },
      },

      hp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: {
            msg: `utilisez uniquement des nombres entiers pour les points de vie.`,
          },
          min: {
            args: [0],
            msg: `les points de vie doivent être supérieurs ou égal à 0`,
          },
          max: {
            args: [999],
            msg: `les points de vie doivent être inférieurs ou égal à 999`,
          },
          notNull: { msg: `les points de vie sont une propriété requise` },
        },
      },

      cp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: {
            msg: `utilisez uniquement des nombres entiers pour les points de dégats.`,
          },
          min: {
            args: [0],
            msg: `les points de dégats doivent être supérieurs ou égal à 0`,
          },
          max: {
            args: [99],
            msg: `les points de dégats doivent être inférieurs ou égal à 99`,
          },
          notNull: { msg: `les points de dégats sont une propriété requise` },
        },
      },
      picture: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isUrl: { msg: `utilisez un url valide pour vos images` },
          notNull: {
            msg: `une image est necessaire pour identifier votre pokemon`,
          },
        },
      },
      types: {
        type: DataTypes.STRING,
        allowNull: false,
        get() {
          return this.getDataValue("types").split(",");
        },
        set(types) {
          this.setDataValue("types", types.join());
        },
      },
    },
    {
      timestamps: true,
      createdAt: "created",
      updatedAt: false,
    }
  );
};

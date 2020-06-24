const models = require("../../../models");
const bcrypt = require("bcryptjs");

module.exports = {
  User: {
    favorites: async (parent) => {
      const favorites = await models.favorite.findAll({
        where: {
          user_id: parent.id,
        },
        include: [models.snack],
      });
      const result = favorites.map(
        (favorite) => favorite.dataValues.snack.dataValues
      );
      return result;
    },
    address: (parent) => {
      return models.address.findByPk(parent.address_id);
    },
  },
  Query: {
    users: () => {
      return models.user.findAll();
    },
    user: (_, args) => {
      return models.user.findByPk(args.id);
    },
  },
  Mutation: {
    createUser: async (_, args) => {
      const { address, password } = args;
      const hashedPassword = await bcrypt.hash(password, 10);

      return models.sequelize
        .transaction((t) => {
          return models.address
            .create(address, { transaction: t })
            .then((addressCreated) => {
              return models.user.create(
                {
                  ...args,
                  password: hashedPassword,
                  address_id: addressCreated.id,
                },
                { transaction: t }
              );
            });
        })
        .then((result) => result)
        .catch((err) => err);
    },
    addFavorite: (_, args) => {
      const { user_id, snack_id } = args;
      return models.favorite
        .create({
          user_id,
          snack_id,
        })
        .then(() => true)
        .catch(() => false);
    },
    removeFavorite: async (_, args) => {
      const { user_id, snack_id } = args;
      return models.favorite
        .destroy({
          where: {
            user_id,
            snack_id,
          },
        })
        .then(() => true)
        .catch(() => false);
    },
  },
};

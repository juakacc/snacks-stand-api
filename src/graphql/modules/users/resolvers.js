const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const models = require("../../../models");

module.exports = {
  User: {
    orders: (parent) => {
      return models.order.findAll({
        where: {
          client_id: parent.id,
        },
      });
    },
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
    updateUser: async (_, args) => {
      const { user_id, address_id, address } = args;

      const user = await models.user.findByPk(user_id);

      return models.sequelize
        .transaction((t) => {
          return models.address
            .update(
              address,
              {
                where: {
                  id: user.address_id,
                },
              },
              { transaction: t }
            )
            .then(() => {
              return models.user.update(
                {
                  ...args,
                },
                {
                  where: {
                    id: user_id,
                  },
                },
                { transaction: t }
              );
            });
        })
        .then(() => models.user.findByPk(user_id))
        .catch((err) => err);
    },
    login: async (_, args) => {
      const { username, password } = args;

      const user = await models.user.findOne({
        where: {
          username,
        },
      });

      if (!user) throw new Error("User not found");

      const valid = await bcrypt.compare(password, user.password);
      if (!valid) throw new Error("Invalid password");

      const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);

      return {
        token,
        user,
      };
    },
    addFavorite: async (_, args) => {
      const { user_id, snack_id } = args;

      const favorite = await models.favorite.findOne({
        where: {
          user_id,
          snack_id,
        },
      });

      if (favorite) return true;

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

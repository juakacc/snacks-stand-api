const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const models = require("../../../models");
const { getUserId } = require("../../../utils");

module.exports = {
  User: {
    orders: (parent) => {
      return models.order.findAll({
        where: {
          client_id: parent.id,
        },
      });
    },
    favorites: async (parent, _, context) => {
      const userId = getUserId(context);
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
    creditCards: async (parent) => {
      return models.credit_card.findAll({
        where: {
          user_id: parent.id,
        },
      });
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
    updateUser: async (_, args, context) => {
      const user_id = getUserId(context);
      const { address_id, address } = args;

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
    addFavorite: async (_, args, context) => {
      const user_id = getUserId(context);
      const { snack_id } = args;

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
    removeFavorite: async (_, args, context) => {
      const user_id = getUserId(context);
      const { snack_id } = args;

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
    addCreditCart: (_, args, context) => {
      const user_id = getUserId(context);
      const { number, nameOwner, validateDate, securityCode } = args;

      return models.credit_card.create({
        number,
        nameOwner,
        validateDate,
        securityCode,
        user_id,
      });
    },
    removeCreditCard: (_, args, context) => {
      const user_id = getUserId(context);
      const { id } = args;

      return models.credit_card
        .destroy({
          where: {
            id,
            user_id,
          },
        })
        .then((a) => a > 0)
        .catch(() => false);
    },
  },
};

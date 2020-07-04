const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const models = require("../../../models");
const { getUserId } = require("../../../utils");

module.exports = {
  Snack: {
    store: (parent) => models.store.findByPk(parent.store_id),
    comments: (parent) => {
      return models.snack_comment.findAll({
        where: {
          snack_id: parent.id,
        },
      });
    },
  },
  SnackComment: {
    user: (parent) => models.user.findByPk(parent.user_id),
    snack: (parent) => models.snack.findByPk(parent.snack_id),
  },
  Query: {
    snacks: () => models.snack.findAll(),
    snack: (_, args) => models.snack.findByPk(args.id),
    searchSnack: (_, args) =>
      models.snack.findAll({
        where: {
          [Op.or]: [
            {
              name: {
                [Op.like]: `%${args.key}%`,
              },
            },
            {
              description: {
                [Op.like]: `%${args.key}%`,
              },
            },
          ],
        },
      }),
    getNewSnacks: (_, args) => {
      const { store_id } = args;

      if (store_id) {
        return models.snack.findAll({
          where: {
            [Op.and]: [
              {
                store_id,
              },
              {
                new: true,
              },
            ],
          },
        });
      } else {
        return models.snack.findAll({
          where: {
            new: true,
          },
        });
      }
    },
  },
  Mutation: {
    createSnack: (_, args, context) => {
      const userId = getUserId(context);
      return models.snack.create(args);
    },
    createSnackComment: (_, args) => {
      const userId = getUserId(context);
      return models.snack_comment.create(args);
    },
  },
};

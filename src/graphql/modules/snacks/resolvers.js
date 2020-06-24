const models = require("../../../models");

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
  },
  Mutation: {
    createSnack: (_, args) => {
      return models.snack.create(args);
    },
    createSnackComment: (_, args) => {
      return models.snack_comment.create(args);
    },
  },
};

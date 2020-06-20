const models = require("../../../models");

export default {
  Snack: {
    store: (parent) => models.store.findByPk(parent.store_id),
  },
  Query: {
    snacks: () => models.snack.findAll(),
    snack: (_, args) => models.snack.findByPk(args.id),
  },
  Mutation: {
    createSnack: (_, args) => {
      return models.snack.create(args);
    },
  },
};

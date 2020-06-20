const models = require("../../../models");

export default {
  Store: {
    owner: (parent) => models.user.findByPk(parent.owner_id),
    address: (parent) => models.address.findByPk(parent.address_id),
    snacks: (parent) =>
      models.snack.findAll({
        where: {
          store_id: parent.id,
        },
      }),
  },
  Query: {
    stores: () => models.store.findAll(),
    store: (_, args) => {
      return models.store.findByPk(args.id);
    },
  },
  Mutation: {
    createStore: (_, args) => {
      const { address } = args;

      return models.sequelize
        .transaction((t) => {
          return models.address
            .create(address, { transaction: t })
            .then((addressCreated) => {
              return models.store.create(
                {
                  ...args,
                  address_id: addressCreated.id,
                },
                { transaction: t }
              );
            });
        })
        .then((result) => result)
        .catch((err) => err);
    },
  },
};

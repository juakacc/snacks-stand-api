const models = require("../../../models");

export default {
  User: {
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
      const { address } = args;

      return models.sequelize
        .transaction((t) => {
          return models.address
            .create(address, { transaction: t })
            .then((addressCreated) => {
              return models.user.create(
                { ...args, address_id: addressCreated.id },
                { transaction: t }
              );
            });
        })
        .then((result) => result)
        .catch((err) => err);
    },
  },
};

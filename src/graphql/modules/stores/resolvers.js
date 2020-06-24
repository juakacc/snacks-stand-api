const models = require("../../../models");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

module.exports = {
  Store: {
    owner: (parent) => models.user.findByPk(parent.owner_id),
    address: (parent) => models.address.findByPk(parent.address_id),
    classifications: (parent) =>
      models.store_classification.findAll({
        where: {
          store_id: parent.id,
        },
      }),
    snacks: async (parent) => {
      const aux = await models.store.findByPk(parent.id);
      const aux2 = await aux.getSnacks();
      // console.log(aux2);

      // const s = await models.snack.findAll({
      //   where: {
      //     store_id: parent.id,
      //   },
      // });

      return aux2;
    },
  },
  StoreClassification: {
    user: (parent) => models.user.findByPk(parent.user_id),
    store: (parent) => models.store.findByPk(parent.store_id),
  },
  Query: {
    stores: () => models.store.findAll(),
    store: (_, args) => {
      return models.store.findByPk(args.id);
    },
    searchStore: (_, args) =>
      models.store.findAll({
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
    createStoreClassification: (_, args) => {
      return models.store_classification.create(args);
    },
  },
};

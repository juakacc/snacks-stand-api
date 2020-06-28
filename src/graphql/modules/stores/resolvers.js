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
    classification: async (parent) => {
      const count = await models.store_classification.count({
        where: {
          store_id: parent.id,
        },
      });

      if (count > 0) {
        const sum = await models.store_classification.sum("classification", {
          where: {
            store_id: parent.id,
          },
        });
        return sum / count;
      } else {
        return 0;
      }
    },
    snacks: async (parent) => {
      return models.snack.findAll({
        where: {
          store_id: parent.id,
        },
      });
    },
    news: (parent) => {
      return models.snack.findAll({
        where: {
          [Op.and]: [
            {
              store_id: parent.id,
            },
            {
              new: true,
            },
          ],
        },
      });
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
    createStoreClassification: async (_, args) => {
      const { store_id, user_id } = args;

      const classification = await models.store_classification.findOne({
        where: {
          store_id,
          user_id,
        },
      });

      if (classification) {
        return models.store_classification
          .update(args, {
            where: {
              id: classification.id,
            },
          })
          .then(() => {
            return models.store_classification.findByPk(classification.id);
          });
      } else {
        return models.store_classification.create(args);
      }
    },
  },
};

const models = require("../../../models");

module.exports = {
  Order: {
    store: (parent) => models.store.findByPk(parent.store_id),
    client: (parent) => models.user.findByPk(parent.client_id),
    items: async (parent) => {
      const order = await models.order.findByPk(parent.id);
      const items = await order.getItems();
      return items;
    },
    value: async (parent) => {
      // Verify database
      const order = await models.order.findByPk(parent.id);
      const items = await order.getItems();
      return items.reduce((sum, item) => sum + item.value * item.amount, 0);
    },
  },
  OrderItem: {
    order: (parent) => {
      return models.order.findByPk(parent.order_id);
    },
    snack: (parent) => {
      return models.snack.findByPk(parent.snack_id);
    },
  },
  Query: {
    orders: () => models.order.findAll(),
  },
  Mutation: {
    createOrder: (_, args) => {
      const { note, status, client_id, store_id, items } = args;

      return models.sequelize
        .transaction((t) => {
          return models.order
            .create(
              {
                note,
                status,
                client_id,
                store_id,
              },
              { transaction: t }
            )
            .then((order) => {
              const orderItems = items.map((item) => ({
                ...item,
                order_id: order.id,
              }));

              return models.order_item
                .bulkCreate(orderItems, {
                  transaction: t,
                })
                .then(() => order);
            });
        })
        .then((result) => result)
        .catch((err) => err);
    },
  },
};

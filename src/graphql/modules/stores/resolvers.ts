const models = require("../../../models");

export default {
  Store: {
    owner: (parent) => models.user.findByPk(parent.owner_id),
  },
  Query: {
    stores: () => models.store.findAll(),
  },
};

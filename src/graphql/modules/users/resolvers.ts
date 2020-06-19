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
  },
};

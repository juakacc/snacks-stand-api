const users = [
  {
    _id: 1,
    name: "Joaquim",
  },
  {
    _id: 2,
    name: "Jack",
  },
];

export default {
  Query: {
    teste: () => "Test API",
    users: () => users,
  },
};

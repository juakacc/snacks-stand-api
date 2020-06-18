const users = [
  {
    id: 1,
    name: "Joaquim",
  },
  {
    id: 2,
    name: "Jack",
  },
];

export default {
  Query: {
    teste: () => "Test API",
    users: () => users,
  },
};

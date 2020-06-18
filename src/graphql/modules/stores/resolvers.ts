export default {
  Store: {
    owner: () => ({
      id: 1,
      name: "Joaquim",
    }),
  },
  Query: {
    stores: () => [
      {
        id: 2,
        name: "Lanches Certo",
        owner: 1,
      },
    ],
  },
};

import { gql, ApolloServer } from "apollo-server";
import typeDefs from "./src/graphql/typedefs";
import resolvers from "./src/graphql/resolvers";

const server = new ApolloServer({ typeDefs, resolvers });
server.listen().then(({ url }) => {
  console.log(`Server is running on ${url}`);
});

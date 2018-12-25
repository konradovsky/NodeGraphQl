import { GraphQLServer } from "graphql-yoga";

// Schemas

const typeDefs = `
    type Query {
        hello: String!
    }
`;

// Resolvers

const resolvers = {
  Query: {
    hello() {
      return "This is a simple hello message!";
    }
  }
};

const server = new GraphQLServer({
  typeDefs,
  resolvers
});

server.start(() => {
  console.log("The server is up!");
});

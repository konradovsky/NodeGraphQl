import { GraphQLServer, PubSub } from "graphql-yoga";
import db from "./db";
// Resolvers
import Query from "./resolvers/Query";
import Comment from "./resolvers/Comment";
import Mutation from "./resolvers/Mutation";
import Post from "./resolvers/Post";
import User from "./resolvers/User";
import Subscription from "./resolvers/Subscription";

const pubsub = new PubSub();

const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers: {
    Query,
    Mutation,
    Post,
    User,
    Comment,
    Subscription
  },
  context: {
    db,
    pubsub
  }
});

server.start(() => {
  console.log("The server is up! on host :4000");
});

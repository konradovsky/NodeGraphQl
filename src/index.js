import { GraphQLServer } from "graphql-yoga";
import uuidv4 from "uuid/v4";

import db from "./db";

// Resolvers
const resolvers = {
  Query: {
    comments(parent, args, { db }, info) {
      return db.comments;
    },
    users(parent, args, { db }, info) {
      if (!args.query) {
        return db.users;
      }
      return db.users.filter(user => {
        return user.name.toLowerCase().includes(args.query.toLowerCase());
      });
    },
    posts(parent, args, { db }, info) {
      if (!args.query) {
        return db.posts;
      }

      return db.posts.filter(post => {
        const isTitleMatch = post.title
          .toLowerCase()
          .includes(args.query.toLowerCase());
        const isBodyMatch = post.body
          .toLowerCase()
          .includes(args.query.toLowerCase());
        return isTitleMatch || isBodyMatch;
      });
    }
  },
  Mutation: {
    createUser(parent, args, { db }, info) {
      const emailTaken = db.users.some(user => user.email === args.data.email);

      if (emailTaken) {
        throw new Error("Email taken.");
      }

      const user = {
        id: uuidv4(),
        ...args.data
      };

      db.users.push(user);

      return user;
    },
    deleteUser(parent, args, { db }, info) {
      const userIndex = db.users.findIndex(user => user.id === args.id);

      if (userIndex === -1) {
        throw new Error("User does not exist.");
      }

      const deletedUsers = db.users.splice(userIndex, 1);

      db.posts = posts.filter(post => {
        const match = post.author === args.id;
        if (match) {
          db.comments = db.comments.filter(comment => comment.post !== post.id);
        }
        return !match;
      });

      db.comments = db.comments.filter(comment => comment.author !== args.id);

      return deletedUsers[0];
    },
    createPost(parent, args, { db }, info) {
      const doesAuthorExists = db.users.some(
        user => user.id === args.data.author
      );
      if (!doesAuthorExists) {
        throw new Error("Such user does not exists");
      }
      const post = {
        id: uuidv4(),
        ...args.data
      };
      db.posts.push(post);
      return post;
    },
    deletePost(parent, args, { db }, info) {
      const indexPost = db.posts.findIndex(post => post.id === args.id);

      if (indexPost === -1) {
        throw new Error("Such post doesn't exists.");
      }
      const deletedPost = db.posts.splice(indexPost, 1);

      db.comments = db.comments.filter(comment => comment.post !== args.id);

      return deletedPost[0];
    },
    createComment(parent, args, { db }, info) {
      const isPostExisting = db.posts.some(post => post.id === args.data.post);
      const doesAuthorExists = db.users.some(
        user => user.id === args.data.author
      );

      if (!doesAuthorExists && !isPostExisting) {
        throw new Error("Author or Post does not exists");
      }

      const comment = {
        id: uuidv4(),
        ...args.data
      };

      db.comments.push(comment);

      return comment;
    },
    deleteComment(parent, args, { db }, info) {
      const commentIndex = db.comments.findIndex(
        comment => comment.id === args.id
      );

      if (commentIndex === -1) {
        throw new Error("Comment doesn't exist");
      }
      const deletedComments = db.comments.splice(commentIndex, 1);

      return deletedComments[0];
    }
  },
  Post: {
    author(parent, args, { db }, info) {
      return db.users.find(user => {
        return user.id === parent.author;
      });
    },
    comments(parent, args, { db }, info) {
      return db.comments.filter(comment => {
        return comment.post === parent.id;
      });
    }
  },
  User: {
    posts(parent, args, { db }, info) {
      return db.posts.filter(post => {
        return post.author === parent.id;
      });
    },
    comments(parent, args, { db }, info) {
      return db.comments.filter(comment => {
        return comment.author === parent.id;
      });
    }
  },
  Comment: {
    author(parent, args, { db }, info) {
      return db.users.find(user => {
        return user.id === parent.author;
      });
    },
    post(parent, args, { db }, info) {
      return db.posts.find(post => {
        return post.id === parent.post;
      });
    }
  }
};

const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers,
  context: {
    db
  }
});

server.start(() => {
  console.log("The server is up! on host :4000");
});

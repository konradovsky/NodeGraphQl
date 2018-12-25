import { GraphQLServer } from "graphql-yoga";

// Demo data
const users = [
  {
    id: "1",
    name: "Konrad",
    email: "Konrad-1@o2.pl",
    age: 11
  },
  {
    id: "2",
    name: "Robert",
    email: "Robert-1@o2.pl",
    age: 22
  },
  {
    id: "3",
    name: "Lilian",
    email: "Lilian-1@o2.pl",
    age: 33
  }
];
const posts = [
  {
    id: "1",
    title: "Are bananas real yellow?",
    body: "No there are not, thank you",
    author: "1",
    published: true
  },
  {
    id: "2",
    title: "Are kiwis real green?",
    body: "No there are not, belevie me please, thank you",
    author: "2",
    published: true
  },
  {
    id: "3",
    title: "Are socks real smelling?",
    body: "Yes there are, thank you",
    author: "3",
    published: false
  }
];
const comments = [
  {
    id: "11",
    text: "Some text for first comment and nothing more",
    author: "1",
    post: "1"
  },
  {
    id: "22",
    text: "Some text for second comment and nothing more",
    author: "2",
    post: "2"
  },
  {
    id: "33",
    text: "Some text for third comment and nothing more",
    author: "3",
    post: "3"
  },
  {
    id: "44",
    text: "Some text for forth comment and nothing more",
    author: "3",
    post: "2"
  }
];
// Schemas
const typeDefs = `
    type Query {
        users(query: String): [User!]!
        posts(query: String): [Post!]!
        comments: [Comment!]!
        me: User!
        post: Post!
    }    
    type User {
        id: ID!
        name: String!
        email: String!
        age: Int
        posts: [Post!]!
        comments: [Comment!]
    }
    type Post {
        id: ID!
        title: String!
        body: String!
        published: Boolean!
        author: User!
        comments: [Comment!]!
    }
    type Comment {
        id: ID!
        text: String!
        author: User!
        post: Post
    }
`;

// Resolvers

const resolvers = {
  Query: {
    comments(parent, args, ctx, info) {
      return comments;
    },
    users(parent, args, ctx, info) {
      if (!args.query) {
        return users;
      }
      return users.filter(user => {
        return user.name.toLowerCase().includes(args.query.toLowerCase());
      });
    },
    posts(parent, args, ctx, info) {
      if (!args.query) {
        return posts;
      }

      return posts.filter(post => {
        const isTitleMatch = post.title
          .toLowerCase()
          .includes(args.query.toLowerCase());
        const isBodyMatch = post.body
          .toLowerCase()
          .includes(args.query.toLowerCase());
        return isTitleMatch || isBodyMatch;
      });
    },
    me() {
      return {
        id: "234fsdf34123",
        name: "Konrad",
        email: "example@oo.com",
        age: 443
      };
    },
    post() {
      return {
        id: "w3jsda2i",
        title: "About the new cdpr game",
        body: "Cyberpunkt comming 2019?",
        published: true
      };
    }
  },
  Post: {
    author(parent, args, ctx, info) {
      return users.find(user => {
        return user.id === parent.author;
      });
    },
    comments(parent, args, ctx, info) {
      return comments.filter(comment => {
        return comment.post === parent.id;
      });
    }
  },
  User: {
    posts(parent, args, ctx, info) {
      return posts.filter(post => {
        return post.author === parent.id;
      });
    },
    comments(parent, args, ctx, info) {
      return comments.filter(comment => {
        return comment.author === parent.id;
      });
    }
  },
  Comment: {
    author(parent, args, ctx, info) {
      return users.find(user => {
        return user.id === parent.author;
      });
    },
    post(parent, args, ctx, info) {
      return posts.find(post => {
        return post.id === parent.post;
      });
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

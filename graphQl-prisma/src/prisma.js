import { Prisma } from "prisma-binding";

const prisma = new Prisma({
  typeDefs: "src/generated/prisma.graphql",
  endpoint: "http://localhost:4466"
});

const createPostForUser = async (authorId, data) => {
  const userExists = await prisma.exists.User({ id: authorId });

  if (!userExists) {
    throw new Error("User not found");
  }
  const post = await prisma.mutation.createPost(
    {
      data: {
        ...data,
        author: {
          connect: {
            id: authorId
          }
        }
      }
    },
    "{id}"
  );
  const user = await prisma.query.user(
    {
      where: {
        id: authorId
      }
    },
    "{ id name email posts {id title published }}"
  );
  return user;
};
createPostForUser("cjqh87l9q002a0770cjmu4liv", {
  title: "This i a title for the new 2d2post",
  body: "THERE you have a new body for the one and best",
  published: true
})
  .then(user => console.log(JSON.stringify(user, undefined, 2)))
  .catch(error => console.log(error));

const updatePostForUser = async (postId, data) => {
  const post = await prisma.mutation.updatePost(
    {
      data: {
        ...data
      },
      where: {
        id: postId
      }
    },
    "{author {id}}"
  );
  const user = await prisma.query.user(
    {
      where: {
        id: post.author.id
      }
    },
    "{ id name email posts {id title published }}"
  );
  return user;
};

// updatePostForUser("cjqhq8zxz002s0770hkjiqeyi", {
//   title: "Fuck yeah"
// }).then(data => console.log(JSON.stringify(data, undefined, 2)));

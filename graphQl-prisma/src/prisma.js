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
    "{ author {id name email posts {id title published }}}"
  );
  return post.author;
};

// createPostForUser("cjqh87l9q002a0770cjmu4liv", {
//   title: "Hhahha",
//   body: "THERE you have a new body for the one and best",
//   published: true
// })
//   .then(user => console.log(JSON.stringify(user, undefined, 2)))
//   .catch(error => console.log(error.message));

const updatePostForUser = async (postId, data) => {
  const postExists = prisma.exists.Post({ id: postId });
  if (!postExists) {
    throw new Error("Post not found");
  }
  const post = await prisma.mutation.updatePost(
    {
      data: {
        ...data
      },
      where: {
        id: postId
      }
    },
    "{author {id name email posts {id title published }}}"
  );
  return post.author;
};

updatePostForUser("cjqhq8zxz002s0770hkjiqeyi", {
  title: "Fuck yeah v3"
})
  .then(data => console.log(JSON.stringify(data, undefined, 2)))
  .catch(error => {
    console.log(error.message);
  });

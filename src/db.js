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
const db = {
  users,
  posts,
  comments
};

export { db as default };

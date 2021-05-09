const { gql } = require('apollo-server-express');

//vll:?? Do we need image and link for 
// books? The instructions say yes, but
// are we storing an image?


const typeDefs = gql`

type Auth {
  token: ID!
  user: User
}

type User {
  _id: ID
  username: String
  email: String
  bookCount: Int
  savedBooks:[Book]
}

type Book{
  bookId: String
  authors:[String]
  description: String
  title: String
  image: String
  link: String
}

  type Query {
    me: User
  }

  type Mutation {
    login(
      email: String!,
      password: String!
    ): Auth

    addUser(
      username: String!,
      email: String!,
      password: String!
    ): Auth

    saveBook(
      authors[String],
      description:String!,
      bookId:ID!,
      title: String!,
      image: String,
      link: String
    ): User

    removeBook(
      bookId:String!
    ):User
  }
`;

module.exports = typeDefs;

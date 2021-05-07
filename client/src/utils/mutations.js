import gql from 'graphql-tag';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser(
    $username: String!,
    $email: String!,
    $password: String!) {
    addUser(
      username: $username,
      email: $email,
      password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;
// Mutation: Part 1: args; 
//part 2 - post / put;
//part 3: returned object (user)
// do we need to return the book parameters?
export const SAVE_BOOK = gql`
  mutation saveBook(
    $authors[String],
    $description:String!,
    $bookId:String!,
    $title: String!,
    $image: String,
    $link: String) {
    saveBook(
      authors:$authors,
      description: $description,
      bookId: $bookId,
      title: $title,
      image: $image,
      link: $link) {
        _id
        username
        savedBooks {
          bookId
          authors
          image
          title
          description
        }
      }
      }
      }
    }
  }
`;


export const REMOVE_BOOK = gql`
  mutation removeBook($bookId:String!) {
    removeFriend(bookId: $bookId) 
    }
  }
`;

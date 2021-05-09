import gql from 'graphql-tag';

export const LOGIN_USER = gql`
  mutation loginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
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
// vll:?? Question about the return parameters and how they
// relate to bookToSave in searchBooks.js
export const SAVE_BOOK = gql`
  mutation saveBook($authors:[String], $description:String!, $bookId:String!, $title: String!, $image: String, $link: String) {
    saveBook(authors:$authors, description: $description, bookId: $bookId, title: $title, image: $image, link: $link) {
      _id
      username
      email
      savedBooks {
        authors
        description
        bookId
        title
        image
        link
      }   
    }
  }
`;

//vll:?? Do I need to return the rest of the deleted book info
// in the returned user? - yes!
export const REMOVE_BOOK = gql`
  mutation removeBook($bookId:String!) {
    removeBook(bookId: $bookId) {
      _id
      username
      email
      savedBooks {
        bookId
        authors
        image
        title
        description
        link
      }
    }
  }
`;

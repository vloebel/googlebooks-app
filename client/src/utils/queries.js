import gql from 'graphql-tag';

//vll:?? Do we need image and link for 
// books? The instructions say yes, but
// are we storing an image?


export const GET_ME = gql`
  {
    getMe {
      _id
      username
      email
      bookCount: Int
      savedBooks:{
        bookId
        authors
        description
        title
        image
        link
      }
    }
  }
`;

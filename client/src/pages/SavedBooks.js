import { Jumbotron, Container, CardColumns, Card, Button } from 'react-bootstrap';

import { useMutation, useQuery } from '@apollo/react-hooks';
import { REMOVE_BOOK } from '../utils/mutations';
import { GET_ME } from '../utils/queries';

import Auth from '../utils/auth';
import { removeBookId } from '../utils/localStorage';

const SavedBooks = () => {

  //vll: Instructions say:
  // Remove the useEffect() Hook that sets the state for
  // UserData Instead, use theuse Query()
  // Hook to execute the GET_ME query onload
  // and save it to  variable named userData
  // example from module:
  //const { loading, data } = useQuery(QUERY_THOUGHTS);
  //const thoughts = data?.thoughts || [];

  const { loading, userData } = useQuery(GET_ME);
  const user = userData?.getMe || [];
  // vll: why an array? remove book returns a user
  
  // Use the  useMutation() Hook to execute the
  // REMOVE_BOOK  mutation in the   handleDeleteBook()
  // function instead of the   deleteBook()
  // function that's imported from  API
  
  const [removeBook] = useMutation(REMOVE_BOOK);
  
  // vll: ?? still not sure this is how to get the token
  
  const handleDeleteBook = async (bookId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    // vll:?? WHERE is this removing the book FROM? I thought it was
    // only saved to local storage. The original code passed in bookID,token
    // so that could specify the user, but here we don't!!
    // the resolver here doesn't have a user on it.
    //WAIT *** App.js puts it in the headers so we have it already?
    try {
      const response = await removeBook(bookId);

      if (!response.ok) {
        throw new Error('something went wrong!');
      }

      const updatedUser = await response.json();
      setUserData(updatedUser);
      // upon success, remove book's id from localStorage
      removeBookId(bookId);
    } catch (err) {
      console.error(err);
    }
  };

  // if data isn't here yet, say so
  if (!userDataLength) {
    return <h2>LOADING...</h2>;
  }

  return (
    <>
      <Jumbotron fluid className='text-light bg-dark'>
        <Container>
          <h1>Viewing saved books!</h1>
        </Container>
      </Jumbotron>
      <Container>
        <h2>
          {userData.savedBooks.length
            ? `Viewing ${userData.savedBooks.length} saved ${userData.savedBooks.length === 1 ? 'book' : 'books'}:`
            : 'You have no saved books!'}
        </h2>
        <CardColumns>
          {userData.savedBooks.map((book) => {
            return (
              <Card key={book.bookId} border='dark'>
                {book.image ? <Card.Img src={book.image} alt={`The cover for ${book.title}`} variant='top' /> : null}
                <Card.Body>
                  <Card.Title>{book.title}</Card.Title>
                  <p className='small'>Authors: {book.authors}</p>
                  <Card.Text>{book.description}</Card.Text>
                  <Button className='btn-block btn-danger' onClick={() => handleDeleteBook(book.bookId)}>
                    Delete this Book!
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
    </>
  );
};

export default SavedBooks;

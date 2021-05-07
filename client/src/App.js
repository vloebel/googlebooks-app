import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';
import SearchBooks from './pages/SearchBooks';
import SavedBooks from './pages/SavedBooks';
import Navbar from './components/Navbar';

// Pull jwt from localstorage and include it in headers
// must include: "proxy": "http://localhost:3001", above dependencies in
// package.json in client directory
// FROM THE MODULE:
// With this proxy value in place, the Create React App team set up the
// development server to pre􀂦x all HTTP requests using relative paths (e.g.,
// /graphql instead of http://localhost:3001/graphql ) with whatever value is
// provided to it. Now the HTTP requests will work in both development and
// production environments
const client = new ApolloClient({
  request: operation => {
    const token = localStorage.getItem('id_token');

    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : ''
      }
    });
  },
  uri: '/graphql'
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <>
          <Navbar />
          <Switch>
            <Route exact path='/' component={SearchBooks} />
            <Route exact path='/saved' component={SavedBooks} />
            <Route render={() => <h1 className='display-2'>Wrong page!</h1>} />
          </Switch>
        </>
      </Router>
    </ApolloProvider>

  );
}

export default App;

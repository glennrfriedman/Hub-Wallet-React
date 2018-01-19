import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();

// from Auth0 tutorial - stopped on 1/11 - come back to later 
// https://auth0.com/blog/build-a-rottentomatoes-clone-with-graphql-and-auth0/

// import React from 'react';
// import ReactDOM from 'react-dom';
// import Hub from './Components/Hub'
// import Coincard from './Components/Coincard'
// import { Router, Route, browserHistory } from 'react-router'
// import ApolloClient, { createNetworkInterface } from 'apollo-client'
// import { ApolloProvider } from 'react-apollo'
// import 'tachyons'
// import './index.css';
// import registerServiceWorker from './registerServiceWorker';
// import { requireAuth } from './utils/AuthService';


// const networkInterface = createNetworkInterface({
//   uri: 'https://api.graph.cool/simple/v1/cj4j8xezmtdvv0130l95q2gkk'
// })

// // For Authentication
// networkInterface.use([{
//   applyMiddleware (req, next) {
//     if (!req.options.headers) {
//       req.options.headers = {}
//     }
//     // get the authentication token from local storage if it exists
//     if (localStorage.getItem('id_token')) {
//       req.options.headers.authorization = `Bearer ${localStorage.getItem('id_token')}`
//     }
//     next()
//   },
// }])

// const client = new ApolloClient({
//   networkInterface
// })

// ReactDOM.render((
//   <ApolloProvider client={client}>
//     <Router history={browserHistory}>
//       <Route path='/' component={ListMovie} />
//       <Route path='/create' component={CreateMovie} />
//     </Router>
//   </ApolloProvider>
//   ), document.getElementById('root'));
// registerServiceWorker();
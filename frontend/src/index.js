import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import reportWebVitals from './reportWebVitals';

import Root from './components/root';
import configureStore from './store/store';
import jwt_decode from 'jwt-decode'; // used to parse the user's session token 
import { setAuthToken } from './util/session_api_util'
import { logout } from './actions/session_actions';

// test
import axios from 'axios'
window.axios = axios; 
//

document.addEventListener('DOMContentLoaded', () => {
  let store; 

  // if a returning user has a session token stored in localStoage, then set that token on the header of all axios requests 
  if(localStorage.jwToken) { // i imagine jwToken is a key we set in localStorage 
    setAuthToken(localStorage.jwToken)

    // decode the token to obtain the users information 
    const decodedUser = jwt_decode(localStorage.jwToken)

    // preloadedState with the user slice with the session slice containing the below two key value pairs. decodedUser has the users info
    const preloadedState = { session: { isAuthenticated: true, user: decodedUser } };

    store = configureStore(preloadedState);

    const currentTime = Date.now() / 1000; 

    if(decodedUser.exp < currentTime) { // if the token that is provided to the user has expired then logout the user and redirect them to the login page. Remember that we set a expiration time for the token in users route 
      store.dispatch(logout()); // dispatches logout 
      window.location.href = '/login'; // redirects to the login page
    }
  } else { // if there is no token then this is the first time the user has logged in. so you start the store off empty?
     
    store = configureStore({});
  }

  window.store = store

  const root = document.getElementById('root');

  ReactDOM.render(<Root store={store} />, root);
})

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

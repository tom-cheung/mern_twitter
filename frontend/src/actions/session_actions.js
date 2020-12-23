
import * as APIUtil from '../util/session_api_util'; 
import jwt_decode from 'jwt-decode';

export const RECEIVE_CURRENT_USER ="RECEIVE_CURRENT_USER";
export const RECEIVE_SESSION_ERRORS = "RECEIVE_SESSION_ERRORS";
export const RECEIVE_USER_LOGOUT = "RECEIVE_USER_LOGOUT"; 
export const RECEIVE_USER_SIGN_IN = "RECEIVE_USER_SIGN_IN";


export const receiveCurrentUser = (currentUser) => ({ // probably chained onto some axios request, used for login and sign up 
    type: RECEIVE_CURRENT_USER, 
    currentUser // ES6 syntax 
});

export const receiveUserSignIn = () => ({ // redirects to the the user login page upon signup? 
    type: RECEIVE_USER_SIGN_IN, 
});

export const receiveErrors = errors => ({
    type: RECEIVE_SESSION_ERRORS, 
    errors
})

export const logoutUser = () => ({ // standard action creator that generates a POJO for the reducer 
    type: RECEIVE_USER_LOGOUT
});

export const signup = user => dispatch => ( // signs up the user, which returns the user information, which is dispatched to be logged in? 
    APIUtil.signup(user).then(() => (
        dispatch(receiveUserSignIn())
    ), err => (
        dispatch(receiveErrors(err.response.data))
    ))
);

export const login = user => dispatch => (
    APIUtil.login(user).then(res => { // logs in a user 
        const { token } = res.data; // grabs the token from the data being posted 
        localStorage.setItem('jwtToken', token); // sets a key of jwtToken in localStorage with the token as a value. The token should be that string that we assigned the user upon login 
        APIUtil.setAuthToken(token); // this sets a header key of 'Authorization' with value of the users token. The token is assigned in our user routes 
        const decoded = jwt_decode(token);
        dispatch(receiveCurrentUser(decoded))
    })
    .catch(err => {
        dispatch(receiveErrors(err.response.data));
    })
)


export const logout = () => dispatch => {
    // removes the token from local storage 
    localStorage.removeItem('jwtToken')

    // remove the token from the common axios header 
    APIUtil.setAuthToken(false) // by passing in false instead of a token you force a logout essentially 

    dispatch(logoutUser()); // dispatch the action creator to the store 
}



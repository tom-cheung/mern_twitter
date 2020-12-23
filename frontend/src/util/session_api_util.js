import axios from 'axios';

export const setAuthToken = token => {
    if(token) {
        axios.defaults.headers.common['Authorization'] = token; 
    } else {
        delete axios.defaults.headers.common['Authorization'];
    }
}

export const signup = (userData) => {
    return axios.post('/api/users/register', userData); // this is likely some data coming from our frontend 
};

export const login = (userData) => {
    return axios.post('/api/users/login', userData);
};

// this seems to work like the session_token in the rails backend. 
// this function takes in a token
// if it exists, it sets a key value pair on the axios defaults header to 'Authorization' with a value of the token
// if it doesn't exit it delete this token. 
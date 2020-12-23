import axios from 'axios' // this is like the ajax of jquery 

export const getTweets = () => {
    return axios.get('/api/tweets')
};

export const getUserTweets = id => {
    return axios.get(`/api/tweets/user/${id}`)
};

export const writeTweet = data => {
    return axios.post(`/api/tweets/`, data)
}
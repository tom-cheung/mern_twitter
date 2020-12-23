import { RECEIVE_TWEETS, RECEIVE_USER_TWEETS, RECEIVE_NEW_TWEET } from '../actions/tweet_actions';

const defaultState = {
    all: {},
    user: {},
    new: undefined
}

const TweetsReducer = (state = defaultState, action) => {
    Object.freeze(state);
    let newState = Object.assign({}, state);
    switch(action.type) {
        case RECEIVE_TWEETS:
            newState.all = action.tweets.data; // sets the all key to the tweets returns by the axios call 
            return newState;
        case RECEIVE_USER_TWEETS:
            newState.user = action.tweets.data; // the axios call must return something under the data key 
            return newState;
        case RECEIVE_NEW_TWEET: 
            newState.new = action.tweet.data; // sets the value of the new key equal to the new tweet
            return newState;
        default: 
            return state; 
    }
};

export default TweetsReducer; 
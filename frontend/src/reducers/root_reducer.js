import { combineReducers } from 'redux'; 
import SessionAPIReducer from './session_api_reducer';
import ErrorReducer from './errors_reducer';
import TweetsReducer from './tweets_reducer';

const RootReducer = combineReducers({
    tweets: TweetsReducer, 
    session: SessionAPIReducer,
    error: ErrorReducer
})

export default RootReducer; 
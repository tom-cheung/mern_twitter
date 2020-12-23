import { combineReducers } from 'redux'; 
import SessionAPIReducer from './session_api_reducer';
import ErrorReducer from './errors_reducer';

const RootReducer = combineReducers({
    session: SessionAPIReducer,
    error: ErrorReducer
})

export default RootReducer; 
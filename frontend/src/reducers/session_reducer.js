import { RECEIVE_USER_LOGOUT } from '../actions/session_actions';

const initialState = {
    isAuthenticated: false, 
    user: {}
};

const SessionReducer = (state = initialState, action) => {
    switch (action.type) {
        case RECEIVE_USER_LOGOUT:
            return { // remove the user from the slice of state
                isAuthenticated: false, 
                user: undefined
            };
        default:
            return state;
    }
}

export default SessionReducer; 

// delete this if it doesn't break 
import { combineReducers } from 'redux';

import SessionErrorsReducer from './session_errors_reducer';

const ErrorReducer = combineReducers({
    session: SessionErrorsReducer
});

export default ErrorReducer;
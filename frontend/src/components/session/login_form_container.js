import { connect } from 'react-redux';
import { login } from '../../actions/session_actions';
import LoginForm from './login_form';

const mSTP = (state) => {
    return {
        errors: state.error.session
    }; 
}; // errors for the login form, caught by the axios calls, coming from the backend 

const mDTP = (dispatch) => {
    return {
        login: user => dispatch(login(user))
    };
};

export default connect(mSTP, mDTP)(LoginForm);
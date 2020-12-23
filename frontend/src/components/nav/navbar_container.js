import { connect } from 'react-redux';
import { logout } from '../../actions/session_actions';

import NavBar from './navbar';

const mSTP = (state) => ({
    loggedIn: state.session.isAuthenticated // this will probably be built out later... 
}); 

export default connect(mSTP, { logout })(NavBar);

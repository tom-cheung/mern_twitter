import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, withRouter } from 'react-router-dom';

const Auth = ({ component: Component, path, loggedIn, exact }) => (

    <Route path={path} exact={exact} render={(props) => (
    
        !loggedIn ? ( <Component {...props} /> )  : ( <Redirect to="/tweets" /> ) // if not logged in redirect to the login page or registration page i imagine, if logged in redirect to tweets page. Authorized users only. Authorized user to login and sign up page only 
    
    )}/>
)

const Protected = ({ component: Component, loggedIn, ...rest}) => (

    <Route 

        {...rest}
        render={props => 
            loggedIn ? ( <Component {...props} /> ) : ( <Redirect to="/login"/>) // mount the component if authenticated otherwise rediret to login.
            
        }
    />

);

// user the isAuthenticated slice of state to determine whether a user is logged in 

const mapStateToProps = state => ({
    loggedIn: state.session.isAuthenticated
}); 

export const AuthRoute = withRouter(connect(mapStateToProps)(Auth)); // exporting this connected component 
export const ProtectedRoute = withRouter(connect(mapStateToProps)(Protected)); // exportng this connected component 
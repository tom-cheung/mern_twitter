import React from 'react';
import { withRouter } from 'react-router-dom';

class LoginForm extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            email: '', 
            password: '', 
            errors: {}
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.renderErrors = this.renderErrors.bind(this);
    }

    componentWillReceiveProps(nextProps) { // if the user has been authenticated, redirect to the tweets page
        if(nextProps.currentUser === true) {
            this.props.history.push('/tweets'); 
        }
        
        this.setState({errors: nextProps.errors}) // set or clear errors? 
    } // this function maybe why you need to export with router 

    update(field) { // event handler 
        return e => this.setState({
            [field]: e.currentTarget.value
        });
    }

    handleSubmit(e) {
        e.preventDefault();

        let user = {
            email: this.state.email, 
            password: this.state.password
        }

        this.props.login(user); 
    }d

    renderErrors() {
        return(
            <ul>
                {Object.keys(this.state.errors).map((error, i) => (
                    <li key={`error-${i}`}>
                        {this.state.errors[error]}
                    </li>
                ))}
            </ul>
        )
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}> 
                    <div>
                        <input
                            value={this.state.email}
                            onChange={this.update('email')}
                            placeholder="Email"
                        />
                        <br/>
                        <input
                            value={this.state.password}
                            onChange={this.update('password')}
                            placeholder="Password"
                        />
                        <br/>
                        <input type="submit" value="Submit"/>
                        {this.renderErrors()}
                    </div>
                </form>    
            </div>
        );
    }
}

export default withRouter(LoginForm);
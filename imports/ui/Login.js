import React from 'react';
import {Link} from 'react-router';
import {Meteor} from 'meteor/meteor';

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: ''
        };
    }

    onSubmit(e) {
        e.preventDefault();

        let email = this.refs.email.value.trim();
        let password = this.refs.password.value.trim();

        Meteor.loginWithPassword({email}, password, (err) => {
            if (err) {
                this.setState({error: 'Unable to login. Check email and password.'});
            } else {
                this.setState({error: ''});
            }
        });
    }

    render() {
        return (
            <form onSubmit={this.onSubmit.bind(this)} noValidate className="form-signin">

                <h1 className="h3 mb-3 font-weight-normal">DtD Short Lnk</h1>
                <label htmlFor="inputEmail" className="sr-only">Email address</label>
                <input type="email" ref="email" name="email" placeholder="Email" className="form-control" required
                       autoFocus/>
                <label htmlFor="inputPassword" className="sr-only">Password</label>
                <input type="password" ref="password" name="password" placeholder="Password" className="form-control"
                       required/>

                <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
                <p className="mt-2 mb-3 text-muted"><Link to="/signup">Need an account?</Link><br/>&copy; 2017-2018</p>
            </form>

        );
    }
}

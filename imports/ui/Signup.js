import React from 'react';
import {Link} from 'react-router';
import {Accounts} from 'meteor/accounts-base';

export default class Signup extends React.Component {
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
        let first_name = this.refs.first_name.value.trim();
        let last_name = this.refs.last_name.value.trim();
        let profile = {first_name, last_name};

        if (password.length < 9) {
            return this.setState({error: 'Password must be more than 8 characters long'});
        }

        Accounts.createUser({ email, password, profile}, (err) => {
          if (err) {
            this.setState({error: err.reason});
          } else {
            this.setState({error: ''});
          }
        });

    }

    render() {

        return (
            <form onSubmit={this.onSubmit.bind(this)} noValidate className="form-signin">
                <h1 className="h3 mb-3 font-weight-normal">Join DtD Short Lnk</h1>
                {this.state.error ? <p>{this.state.error}</p> : undefined}
                <label htmlFor="inputFirstName" className="sr-only">First Name</label>
                <input type="text" ref="first_name" name="first_name" placeholder="First Name" className="form-control" required/>
                <label htmlFor="inputLastName" className="sr-only">Last Name</label>
                <input type="text" ref="last_name" name="last_name" placeholder="Last Name" className="form-control" required/>
                <label htmlFor="inputEmail" className="sr-only">Email address</label>
                <input type="email" ref="email" name="email" placeholder="Email" className="form-control" required/>
                <label htmlFor="inputPassword" className="sr-only">Password</label>
                <input type="password" ref="password" name="password" placeholder="Password" className="form-control" required/>
                <button className="btn btn-primary btn-block" type="submit">Create Account</button>
            </form>
        );
    }
}

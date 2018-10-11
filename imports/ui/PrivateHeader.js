import React from 'react';
import {Accounts} from 'meteor/accounts-base';
import {Meteor} from 'meteor/meteor';
import PropTypes from 'prop-types';

export default class PrivateHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userEmail: ""
        };
    }

    componentDidMount() {
        console.log('componentDidMount PrivateHeader');
        this.userInfoTracker = Tracker.autorun(() => {
            const user = Accounts.user();
            if (user) {
                const userFN = user.profile.first_name;
                this.setState({userFN});
            }
        });
    }

    componentWillUnmount() {
        console.log('componentWillUnmount PrivateHeader');
        this.userInfoTracker.stop();
    }

    renderUserInfo() {
        return (
            <span>
      {this.state.userFN}
      </span>

        );
    }

    render() {
        return (
            <nav className="navbar navbar-expand-md navbar-dark bg-primary mb-3">
                <div className="container">
                    <a className="navbar-brand" href="#">{this.props.title}</a>
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <a className="nav-link" href="/links">Links</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/tracking">Link Tracking</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#" onClick={() => Accounts.logout()}>Logout ({this.renderUserInfo()})</a>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
};


PrivateHeader.propTypes = {
    title: PropTypes.string.isRequired
};


import React from 'react';
import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';

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
        this.setState({ userFN });
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
      <div className="header">
        <div className="header__content">
          <h1 className="header__title">{this.props.title}</h1>
          <button className="button button--link-text" onClick={() => Accounts.logout()}>Logout ({this.renderUserInfo()}) </button>
        </div>
      </div>
    );
  }
};

PrivateHeader.propTypes = {
  title: React.PropTypes.string.isRequired
};

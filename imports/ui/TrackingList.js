import React from 'react';
import {Meteor} from 'meteor/meteor';
import {Tracker} from 'meteor/tracker';
import {Session} from 'meteor/session';

import {Tracking} from '../api/tracking';
import {Links} from '../api/links';
import TrackingListItem from './TrackingListItem';

export default class TrackingList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tracking: []
        };
    }

    componentDidMount() {
        console.log('componentDidMount TrackingList');
        this.linksTracker = Tracker.autorun(() => {
            Meteor.subscribe('link_tracking');
            const tracking = Tracking.find().fetch();
            this.setState({tracking});
        });
    }

    componentWillUnmount() {
        console.log('componentWillUnmount TrackingList');
        this.linksTracker.stop();
    }

    renderLinksListItems() {
        return this.state.tracking.map((tracked) => {
            return <TrackingListItem key={tracked._id} {...tracked}/>;
        });
    }

    render() {
        return <tbody>{this.renderLinksListItems()}</tbody>;
    }
};

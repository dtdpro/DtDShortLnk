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
        console.log(this.props.linkid);
        this.state = {
            tracking: []
        };
    }

    componentDidMount() {
        console.log('componentDidMount TrackingList');
        this.linksTracker = Tracker.autorun(() => {
            Meteor.subscribe('link_tracking');
            var tracking = null;
            if (this.props.linkid) {
                tracking = Tracking.find({linkId:this.props.linkid}).fetch();
            } else {
                tracking = Tracking.find().fetch();
            }
            this.setState({tracking});
        });
    }

    componentWillUnmount() {
        console.log('componentWillUnmount TrackingList');
        this.linksTracker.stop();
    }

    renderLinksListItems() {
        if (this.state.tracking.length) {
            return this.state.tracking.map((tracked) => {
                return <TrackingListItem key={tracked._id} {...tracked}/>;
            });
        } else {
            return <tr className="bg-warning"><td colSpan="4">No tracking data</td></tr>
        }
    }

    render() {
        return <tbody>{this.renderLinksListItems()}</tbody>;
    }
};

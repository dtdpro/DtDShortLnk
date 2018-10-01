import {Meteor} from 'meteor/meteor';
import React from 'react';
import moment from 'moment';
import {Links} from '../api/links';

export default class TrackingListItem extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    componentWillUnmount() {
    }

    renderVisited() {

        let visitedMessage = null;

        if (typeof this.props.visitedAt === 'number') {
            visitedMessage = `${ moment(this.props.visitedAt).format("YYYY-MM-DD HH:mm") }`;
        }

        return <td>{visitedMessage}</td>;
    }

    renderLnk() {
        //console.log(this.props.linkInfo);
        return <td>{this.props.link.pageTitle}</td>;
    }

    render() {
        return (
            <tr>
                {this.renderLnk()}
                {this.renderVisited()}
                <td>{this.props.ipAddress}</td>
                <td>{this.props.userAgent}</td>
            </tr>
        );
    }
};

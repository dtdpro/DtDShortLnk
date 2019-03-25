import {Meteor} from 'meteor/meteor';
import React from 'react';
import Clipboard from 'clipboard';
import moment from 'moment';
import PropTypes from 'prop-types';

export default class LinksListItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            justCopied: false
        };
    }

    componentDidMount() {
        this.clipboard = new Clipboard(this.refs.copy);

        this.clipboard.on('success', () => {
            this.setState({justCopied: true});
            setTimeout(() => this.setState({justCopied: false}), 1000);
        }).on('error', () => {
            alert('Unable to copy. Please manually copy the link.');
        })
    }

    componentWillUnmount() {
        this.clipboard.destroy();
    }

    renderStats() {
        const visitMessage = this.props.visitedCount === 1 ? 'visit' : 'visits';
        let visitedMessage = null;
        let createdDate = null;

        if (typeof this.props.lastVisitedAt === 'number') {
            visitedMessage = `(visited ${ moment(this.props.lastVisitedAt).fromNow() })`;
        }

        if (this.props.createdAt) {
            createdDate = `${ moment(this.props.createdAt).format("YYYY-MM-DD HH:mm") }`;
        } else {
            createdDate = "N/A";
        }

        return (
            <p className="small">
                {this.props.visitedCount} {visitMessage} {visitedMessage} | {this.props.shortUrl} | Created: {createdDate}
            </p>
        );
    }

    render() {
        /*

                            <button className="btn btn-sm btn-danger" onClick={() => {
                                Meteor.call('links.delete', this.props._id);
                            }}>
                                Delete
                            </button>
         */
        return (
            <div className="col-12">
                <div className="card mb-2 bg-light">
                    <div className="card-body">
                        <img src={"/qr/" + this.props._id} className="float-right"/>
                        <h5 className="card-title">{this.props.pageTitle ? this.props.pageTitle : this.props.url}</h5>
                        <h6 className="card-subtitle mb-2 text-muted">{this.props.url}</h6>
                        {this.renderStats()}
                        <div className="btn-group" role="group">
                            <a className="btn btn-sm btn-primary" href={this.props.shortUrl} target="_blank">
                                Visit
                            </a>
                            <a className="btn btn-sm btn-primary" href={"/tracking/"+this.props._id}>
                                Tracking
                            </a>
                            <a className="btn btn-sm btn-info" href={"/qr-png/" + this.props._id}
                               target="_blank">
                                QR PNG
                            </a>
                            <a className="btn btn-sm btn-info" href={"/qr-svg/" + this.props._id}
                               target="_blank">
                                QR SVG
                            </a>
                            <a className="btn btn-sm btn-info" href={"/qr-eps/" + this.props._id}
                               target="_blank">
                                QR EPS
                            </a>
                            <button className="btn btn-sm btn-success" ref="copy" data-clipboard-text={this.props.shortUrl}>
                                {this.state.justCopied ? 'Copied' : 'Copy'}
                            </button>
                            <button className="btn btn-sm btn-warning" onClick={() => {
                                Meteor.call('links.setVisibility', this.props._id, !this.props.visible);
                            }}>
                                {this.props.visible ? 'Hide' : 'Unhide'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

LinksListItem.propTypes = {
    _id: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    visible: PropTypes.bool.isRequired,
    shortUrl: PropTypes.string.isRequired,
    visitedCount: PropTypes.number.isRequired,
    lastVisitedAt: PropTypes.number
};


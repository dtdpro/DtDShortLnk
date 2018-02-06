import { Meteor } from 'meteor/meteor';
import React from 'react';
import Clipboard from 'clipboard';
import moment from 'moment';

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
      this.setState({ justCopied: true });
      setTimeout(() => this.setState({ justCopied: false }), 1000);
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

    if (typeof this.props.lastVisitedAt === 'number') {
      visitedMessage = `(visited ${ moment(this.props.lastVisitedAt).fromNow() })`;
    }

    return <p className="item__message">{this.props.visitedCount} {visitMessage} {visitedMessage}</p>;
  }
  render() {
    return (
      <div className="item">
        <div className="item__info">
          <h2>{this.props.pageTitle ? this.props.pageTitle : this.props.url}</h2>
          <p className="item__message">{this.props.url}</p>
          {this.renderStats()}
          <a className="button button--pill button--link" href={this.props.shortUrl} target="_blank">
            Visit
          </a>
          <button className="button button--pill" ref="copy" data-clipboard-text={this.props.shortUrl}>
            {this.state.justCopied ? 'Copied' : 'Copy'}
          </button>
          <button className="button button--pill" onClick={() => {
            Meteor.call('links.setVisibility', this.props._id, !this.props.visible);
          }}>
            {this.props.visible ? 'Hide' : 'Unhide'}
          </button>
          <button className="button button--pill" onClick={() => {
            Meteor.call('links.delete', this.props._id);
          }}>
            Delete
          </button>
          <a className="button button--pill button--link" href={"/qr-png/"+this.props._id} target="_blank">
            QR PNG
          </a>
          <a className="button button--pill button--link" href={"/qr-svg/"+this.props._id} target="_blank">
            QR SVG
          </a>
          <a className="button button--pill button--link" href={"/qr-eps/"+this.props._id} target="_blank">
            QR EPS
          </a>
        </div>
        <div className="item__qrcode">
          <img src={"/qr/"+this.props._id} />
        </div>
      </div>
    );
  }
};

LinksListItem.propTypes = {
  _id: React.PropTypes.string.isRequired,
  url: React.PropTypes.string.isRequired,
  pageTitle: React.PropTypes.string.isRequired,
  userId: React.PropTypes.string.isRequired,
  visible: React.PropTypes.bool.isRequired,
  shortUrl: React.PropTypes.string.isRequired,
  visitedCount: React.PropTypes.number.isRequired,
  lastVisitedAt: React.PropTypes.number
};

import React from 'react';
import {Session} from 'meteor/session';
import {Tracker} from 'meteor/tracker';

export default class LinksListFilters extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showVisible: true,
            searchString: ""
        };
    }

    componentDidMount() {
        this.tracker = Tracker.autorun(() => {
            this.setState({
                showVisible: Session.get('showVisible'),
                searchString: Session.get('searchString')
            })
        });
    }

    componentWillUnmount() {
        this.tracker.stop();
    }

    render() {
        return (
            <div className="col-6">
                <div className="form-inline">
                    <div className="form-group mr-2">
                        <input className="form-control" type="text" placeholder="Search URL" checked={!this.state.searchString}
                               onChange={(e) => {
                                   Session.set('searchString', e.target.value);
                               }}/>
                    </div>
                    <div className="form-check form-check-inline">
                        <input id="show-visible" className="form-check-input" type="checkbox" checked={!this.state.showVisible}
                               onChange={(e) => {
                                   Session.set('showVisible', !e.target.checked);
                               }}/>
                        <label className="form-check-label" htmlFor="show-visible">Show hidden links</label>
                    </div>
                </div>
            </div>
        );
    }
}

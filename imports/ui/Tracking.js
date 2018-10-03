import React from 'react';

import TrackingList from './TrackingList';
import PrivateHeader from './PrivateHeader';
import PrivateFooter from './PrivateFooter';

export default (match) => {
    return (
        <div className="wrapper">
            <PrivateHeader title="DtD Short Lnk: Tracking"/>
            <div className="page-content container">
                <table className="table table-striped table-sm">
                    <thead>
                    <tr><th>Link</th><th>Visited</th><th>IP</th><th>User Agent</th></tr>
                    </thead>
                    <TrackingList linkid={match.params.linkid}/>
                </table>
            </div>
            <PrivateFooter/>
        </div>
    );
};

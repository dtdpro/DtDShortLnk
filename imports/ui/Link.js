import React from 'react';

import LinksList from './LinksList';
import PrivateHeader from './PrivateHeader';
import PrivateFooter from './PrivateFooter';
import AddLink from './AddLink';
import LinksListFilters from './LinksListFilters';

export default () => {
  return (
    <div className="wrapper">
      <PrivateHeader title="DtD Short Lnk"/>
      <div className="page-content container">
          <div className="mb-3 row">
        <LinksListFilters/>
        <AddLink/>
          </div>
        <LinksList/>
      </div>
      <PrivateFooter/>
    </div>
  );
};

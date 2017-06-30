import React from 'react';

import LinksList from './LinksList';
import PrivateHeader from './PrivateHeader';
import PrivateFooter from './PrivateFooter';
import AddLink from './AddLink';
import LinksListFilters from './LinksListFilters';

export default () => {
  return (
    <div className="wrapper">
      <PrivateHeader title="Your Links"/>
      <div className="page-content">
        <LinksListFilters/>
        <AddLink/>
        <LinksList/>
      </div>
      <PrivateFooter/>
    </div>
  );
};

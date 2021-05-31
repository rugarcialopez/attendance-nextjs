import { Fragment } from 'react';

import MainNavigation from './MainNavigation';

const Layout: React.FC = (props) => {
  return (
    <Fragment>
      <MainNavigation />
      <main>{props.children}</main>
    </Fragment>
  );
};

export default Layout;
import React from 'react';
import {Link} from 'react-router-dom';
import {AppRoute} from '../../consts';

function Page404() {
  return (
    <React.Fragment>
      <h1>404 Not Found</h1>
      <Link to={AppRoute.MAIN}>back to main page</Link>
    </React.Fragment>
  );
}

export default Page404;

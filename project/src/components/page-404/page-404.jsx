import React from 'react';
import {Link} from 'react-router-dom';
import {AppRoute} from '../../consts';
import './page-404.css';

function Page404() {
  return (
    <main className="not-found">
      <h1>404 Not Found</h1>
      <Link className="to-main" to={AppRoute.MAIN}>back to main page</Link>
    </main>
  );
}

export default Page404;

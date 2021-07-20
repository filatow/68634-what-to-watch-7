import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {AppRoute} from '../../consts';
import UserBlock from '../user-block/user-block';

function Header({children}) {
  return (

    <header className="page-header user-page__head">
      <div className="logo">
        <Link to={AppRoute.MAIN} className="logo__link">
          <span className="logo__letter logo__letter--1">W</span>
          <span className="logo__letter logo__letter--2">T</span>
          <span className="logo__letter logo__letter--3">W</span>
        </Link>
      </div>
      {children}
      <UserBlock />
    </header>
  );
}

Header.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default Header;


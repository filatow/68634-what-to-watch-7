import React from 'react';
import {Link} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../../consts';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {logout} from '../../store/api-actions';

function UserBlock({authorizationStatus, signout}) {
  switch (authorizationStatus) {
    case AuthorizationStatus.AUTH:
      return (
        <ul className="user-block">
          <li className="user-block__item">
            <div className="user-block__avatar">
              <img src="img/avatar.jpg" alt="User avatar" width="63" height="63" />
            </div>
          </li>
          <li className="user-block__item">
            <Link
              // to={AppRoute.LOGIN}
              className="user-block__link"
              onClick={(evt) => {
                evt.preventDefault();

                signout();
              }}
            >
              Sign out
            </Link>
          </li>
        </ul>
      );
    default:
      return (
        <ul className="user-block">
          <li className="user-block__item">
            <Link to={AppRoute.LOGIN} className="user-block__link">Log in</Link>
          </li>
        </ul>
      );
  }
}

UserBlock.propTypes = {
  authorizationStatus: PropTypes.string.isRequired,
  signout: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  authorizationStatus: state.authorizationStatus,
});

const mapDispatchToProps = (dispatch) => ({
  signout() {
    dispatch(logout());
  },
});

export {UserBlock};
export default connect(mapStateToProps, mapDispatchToProps)(UserBlock);


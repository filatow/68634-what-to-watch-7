import React from 'react';
import {Link} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../../consts';
import {useSelector, useDispatch} from 'react-redux';
import {logout} from '../../store/api-actions';
import { getAuthorizationStatus } from '../../store/user/selectors';

function UserBlock() {
  const authorizationStatus = useSelector(getAuthorizationStatus);

  const dispatch = useDispatch();

  switch (authorizationStatus) {
    case AuthorizationStatus.AUTH:
      return (
        <ul className="user-block">
          <li className="user-block__item">
            <div className="user-block__avatar">
              <Link
                to={AppRoute.MYLIST}
              >
                <img src="img/avatar.jpg" alt="User avatar" width="63" height="63" />
              </Link>
            </div>
          </li>
          <li className="user-block__item">
            <Link
              className="user-block__link"
              onClick={(evt) => {
                evt.preventDefault();
                dispatch(logout());
              }}
              to="/"
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

export default UserBlock;

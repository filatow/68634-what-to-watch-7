import React from 'react';
import {Link} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../../consts';
import {useSelector, useDispatch} from 'react-redux';
import {logout} from '../../store/api-actions';
import {getAuthorizationStatus, getUserAuthInfo} from '../../store/user/selectors';

const DEFAULT_AVATAR_URL = 'img/avatar.jpg';

function UserBlock() {
  const authorizationStatus = useSelector(getAuthorizationStatus);
  const userAuthInfo = useSelector(getUserAuthInfo);
  const userAvatar = userAuthInfo.avatarUrl || DEFAULT_AVATAR_URL;
  const userName = userAuthInfo.name;

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
                <img
                  src={userAvatar}
                  alt={userName}
                  width="63"
                  height="63"
                />
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

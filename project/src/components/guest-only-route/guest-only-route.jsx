import React from 'react';
import PropTypes from 'prop-types';
import {useSelector} from 'react-redux';
import {Route, Redirect} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../../consts';
import {getAuthorizationStatus} from '../../store/user/selectors';

function GuestOnlyRoute({render, path, exact}) {
  const authorizationStatus = useSelector(getAuthorizationStatus);

  return (
    <Route
      path={path}
      exact={exact}
      render={(routeProps) => (
        authorizationStatus === AuthorizationStatus.AUTH
          ? <Redirect to={AppRoute.MAIN}/>
          : render(routeProps)
      )}
    />
  );
}

GuestOnlyRoute.propTypes = {
  render: PropTypes.func.isRequired,
  path: PropTypes.string.isRequired,
  exact: PropTypes.bool.isRequired,
};
export default GuestOnlyRoute;

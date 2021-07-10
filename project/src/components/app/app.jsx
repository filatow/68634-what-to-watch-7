import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Router, Switch, Route} from 'react-router-dom';
import Main from '../main/main';
import SignIn from '../sign-in/sign-in';
import MyList from '../my-list/my-list';
import Film from '../film/film';
import AddReview from '../add-review/add-review';
import Player from '../player/player';
import Page404 from '../page-404/page-404';
import Spinner from '../spinner/spinner';
import {AppRoute} from '../../consts';
import {isAuthChecking} from '../../utils';
import browserHistory from '../../browser-history';
import PrivateRoute from '../private-route/private-route';


function App(props) {
  const {
    authorizationStatus,
    // isDataLoaded,
  } = props;

  // if (isAuthChecking(authorizationStatus) || !isDataLoaded) {
  if (isAuthChecking(authorizationStatus)) {
    return <Spinner />;
  }


  return (
    <Router history={browserHistory}>
      <Switch>
        <Route
          path={AppRoute.MAIN}
          exact
          render={
            ({history}) => (
              <Main />
            )
          }
        >
        </Route>
        <Route
          path={AppRoute.LOGIN}
          exact
          render={
            ({history}) => (
              <SignIn />
            )
          }
        />
        <PrivateRoute
          path={AppRoute.MYLIST}
          exact
          render={
            ({history}) => <MyList />
          }
        >
        </PrivateRoute>
        <Route
          path={`${AppRoute.FILMS}/:id`}
          exact
          render={
            ({history, match}) => (
              <Film
                filmId={match.params.id}
              />
            )
          }
        >
        </Route>
        <PrivateRoute
          path={`${AppRoute.FILMS}/:id${AppRoute.REVIEW}`}
          exact
          render={
            ({history, match}) => (
              <AddReview
                filmId={match.params.id}
              />
            )
          }
        >
        </PrivateRoute>
        <Route
          path={`${AppRoute.PLAYER}/:id`}
          exact
          render={
            ({history, match}) => (
              <Player
                filmId={match.params.id}
              />
            )
          }
        >
        </Route>
        <Route
          render={
            () => <Page404 />
          }
        >
        </Route>
      </Switch>
    </Router>
  );
}

App.propTypes = {
  authorizationStatus: PropTypes.string.isRequired,
  // isDataLoaded: PropTypes.bool.isRequired,
  // films: PropTypes.arrayOf(filmProp).isRequired,
};

const mapStateToProps = (state) => ({
  authorizationStatus: state.authorizationStatus,
  // isDataLoaded: state.areFilmsLoaded,
  // films: state.films,
});

export {App};
export default connect(mapStateToProps, null)(App);

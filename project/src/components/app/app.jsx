import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Main from '../main/main';
import SignIn from '../sign-in/sign-in';
import MyList from '../my-list/my-list';
import Film from '../film/film';
import AddReview from '../add-review/add-review';
import Player from '../player/player';
import Page404 from '../page-404/page-404';
import Spinner from '../spinner/spinner';
import filmProp from '../film/film.prop';
import {AppRoute} from '../../consts';
import {isAuthChecking} from '../../utils';


function App(props) {
  const {
    authorizationStatus,
    isDataLoaded,
    films,
    promotedFilm,
  } = props;

  if (isAuthChecking(authorizationStatus) || !isDataLoaded) {
    return <Spinner />;
  }


  return (
    <Router>
      <Switch>
        <Route
          path="/"
          exact
          render={
            () => (
              <Main
                promotedFilm={promotedFilm}
                films={films}
              />
            )
          }
        >
        </Route>
        <Route path={AppRoute.LOGIN} exact component={SignIn} />
        <Route path={AppRoute.MYLIST} exact
          render={
            () => <MyList films={films.slice(5)} />
          }
        >
        </Route>
        <Route path={`${AppRoute.FILMS}/:id`} exact
          render={
            ({match}) => (
              <Film
                film={films.find((film) => String(film.id) === String(match.params.id))}
                similarFilms={films.slice(0, 4)}
              />
            )
          }
        >
        </Route>
        <Route path={`${AppRoute.FILMS}/:id${AppRoute.REVIEW}`} exact
          render={
            ({match}) => (
              <AddReview film={films.find((film) => String(film.id) === String(match.params.id))} />
            )
          }
        >
        </Route>
        <Route path={`${AppRoute.PLAYER}/:id`} exact
          render={
            ({match}) => (
              <Player film={films.find((film) => String(film.id) === String(match.params.id))} />
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
  isDataLoaded: PropTypes.bool.isRequired,
  films: PropTypes.arrayOf(filmProp).isRequired,
  promotedFilm: PropTypes.oneOfType([
    filmProp,
    PropTypes.shape({}),
  ]).isRequired,
};

const mapStateToProps = (state) => ({
  authorizationStatus: state.authorizationStatus,
  isDataLoaded: state.areFilmsLoaded && state.isPromotedFilmLoaded,
  films: state.films,
  promotedFilm: state.promotedFilm,
});

export {App};
export default connect(mapStateToProps, null)(App);

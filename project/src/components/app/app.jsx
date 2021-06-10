import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Main from '../main/main';
import SignIn from '../sign-in/sign-in';
import MyList from '../my-list/my-list';
import Film from '../film/film';
import AddReview from '../add-review/add-review';
import Player from '../player/player';
import Page404 from '../page-404/page-404';
import filmProp from '../film/film.prop';
import {AppRoute} from '../../consts';

function App(props) {
  const {films, title, genre, year} = props;

  return (
    <Router>
      <Switch>
        <Route
          path="/"
          exact
          render={
            () => (
              <Main
                title={title}
                genre={genre}
                year={year}
                films={films}
              >
              </Main>
            )
          }
        >
        </Route>
        <Route path={AppRoute.LOGIN} exact component={SignIn}></Route>
        <Route path={AppRoute.MYLIST} exact
          render={
            () => <MyList films={films.slice(5)}></MyList>
          }
        >
        </Route>
        <Route path={`${AppRoute.FILMS}/:id`} exact
          render={
            ({match}) => (
              <Film
                film={films[match.params.id]}
                similarFilms={films.slice(0, 4)}
              >
              </Film>
            )
          }
        >
        </Route>
        <Route path={`${AppRoute.FILMS}/:id${AppRoute.REVIEW}`} exact
          render={
            ({match}) => <AddReview film={films[match.params.id]}></AddReview>
          }
        >
        </Route>
        <Route path={`${AppRoute.PLAYER}/:id`} exact
          render={
            ({match}) => <Player film={films[match.params.id]}></Player>
          }
        >
        </Route>
        <Route
          render={
            () => <Page404></Page404>
          }
        >
        </Route>
      </Switch>
    </Router>
  );
}

App.propTypes = {
  films: PropTypes.arrayOf(filmProp).isRequired,
  title: PropTypes.string.isRequired,
  genre: PropTypes.string.isRequired,
  year: PropTypes.number.isRequired,
};

export default App;

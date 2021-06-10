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
        <Route path="/login" exact component={SignIn}></Route>
        <Route path="/mylist" exact
          render={
            () => <MyList films={films.slice(5)}></MyList>
          }
        >
        </Route>
        <Route path="/films/:id" exact
          render={
            () => <Film film={films[0]}></Film>
          }
        >
        </Route>
        <Route path="/films/:id/review" exact
          render={
            () => <AddReview film={films[1]}></AddReview>
          }
        >
        </Route>
        <Route path="/player/:id" exact
          render={
            () => <Player film={films[4]}></Player>
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

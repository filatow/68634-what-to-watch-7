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


function App(props) {
  const {title, genre, year} = props;

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
              >
              </Main>
            )
          }
        >
        </Route>
        <Route path="/login" exact component={SignIn}></Route>
        <Route path="/mylist" exact component={MyList}></Route>
        <Route path="/films/:id" exact component={Film}></Route>
        <Route path="/films/:id/review" exact component={AddReview}></Route>
        <Route path="/player/:id" exact component={Player}></Route>
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
  title: PropTypes.string.isRequired,
  genre: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  year: PropTypes.number.isRequired,
};

export default App;

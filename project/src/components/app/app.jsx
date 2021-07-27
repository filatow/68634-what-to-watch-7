import React from 'react';
import {useSelector} from 'react-redux';
import {Switch, Route} from 'react-router-dom';
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
import PrivateRoute from '../private-route/private-route';
import {getAuthorizationStatus} from '../../store/user/selectors';


function App() {
  const authorizationStatus = useSelector(getAuthorizationStatus);

  if (isAuthChecking(authorizationStatus)) {
    return <Spinner />;
  }


  return (
    <Switch>
      <Route
        path={AppRoute.MAIN}
        exact
        render={
          () => (
            <Main />
          )
        }
      >
      </Route>
      <Route
        path={AppRoute.LOGIN}
        exact
        render={
          () => (
            <SignIn />
          )
        }
      />
      <PrivateRoute
        path={AppRoute.MYLIST}
        exact
        render={
          () => <MyList />
        }
      >
      </PrivateRoute>
      <Route
        path={`${AppRoute.FILMS}/:id`}
        exact
        render={
          ({match}) => (
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
          ({match}) => (
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
          ({match}) => (
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
  );
}
export default App;

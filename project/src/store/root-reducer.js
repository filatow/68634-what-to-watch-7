import {combineReducers} from 'redux';
import {mainPage} from './main-page/main-page';
import {user} from './user/user';
import {favoritePage} from './favorite-page/favorite-page';
import {filmPage} from './film-page/film-page';
import {loading} from './loading/loading';

export const NameSpace = {
  MAIN: 'MAIN',
  USER: 'USER',
  FAVORITE: 'FAVORITE',
  FILM: 'FILM',
  LOADING: 'LOADING',
};

export default combineReducers({
  [NameSpace.MAIN]: mainPage,
  [NameSpace.USER]: user,
  [NameSpace.FAVORITE]: favoritePage,
  [NameSpace.FILM]: filmPage,
  [NameSpace.LOADING]: loading,
});

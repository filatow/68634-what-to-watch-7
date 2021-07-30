import {NameSpace} from '../root-reducer';

export const getFavoriteFilms = (state) => state[NameSpace.FAVORITE].favoriteFilms;
export const getFavoriteFilmsErrorCode = (state) =>
  state[NameSpace.FAVORITE].favoriteFilmsErrorCode;

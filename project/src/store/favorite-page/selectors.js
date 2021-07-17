import {NameSpace} from '../root-reducer';

export const getFavoriteFilms = (state) => state[NameSpace.FAVORITE].favoriteFilms;

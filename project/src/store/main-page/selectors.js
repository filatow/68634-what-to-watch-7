import {NameSpace} from '../root-reducer';
import {FilmCategory} from '../../consts';

export const getFilms = (state) => state[NameSpace.MAIN].films;
export const getFilterCategory = (state) => state[NameSpace.MAIN].filterCategory;
export const getFilteredFilms = (state) => {
  if (state[NameSpace.MAIN].filterCategory === FilmCategory.ALL_GENRES) {
    return state[NameSpace.MAIN].films;
  }
  return state[NameSpace.MAIN].films.filter(
    (film) => film.genre === state[NameSpace.MAIN].filterCategory);
};

export const getPromotedFilm = (state) => state[NameSpace.MAIN].promotedFilm;

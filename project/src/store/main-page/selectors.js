import {NameSpace} from '../root-reducer';
import {FilmCategory} from '../../consts';
import {createSelector} from 'reselect';

export const getFilms = (state) => state[NameSpace.MAIN].films;
export const getFilmsErrorCode = (state) => state[NameSpace.MAIN].filmsErrorCode;
export const getFilterCategory = (state) => state[NameSpace.MAIN].filterCategory;
export const getPromotedFilm = (state) => state[NameSpace.MAIN].promotedFilm;
export const getPromotedFilmErrorCode = (state) => state[NameSpace.MAIN].promotedFilmErrorCode;
export const getAllCategories = createSelector(
  [getFilms],
  (films) => [FilmCategory.ALL_GENRES, ...new Set(films.map((film) => film.genre))],
);
export const getFilteredFilms = createSelector(
  [getFilms, getFilterCategory],
  (films, category) => {
    if (category === FilmCategory.ALL_GENRES) {
      return films;
    }
    return films.filter(
      (film) => film.genre === category);
  },
);

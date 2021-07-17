import {NameSpace} from '../root-reducer';

export const getFilms = (state) => state[NameSpace.MAIN].films;
export const getFilterCategory = (state) => state[NameSpace.MAIN].filterCategory;
export const getFilteredFilms = (state) => state[NameSpace.MAIN].filteredFilms;
export const getPromotedFilm = (state) => state[NameSpace.MAIN].promotedFilm;

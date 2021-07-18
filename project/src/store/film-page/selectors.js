import {NameSpace} from '../root-reducer';

export const getCurrentFilm = (state) => state[NameSpace.FILM].currentFilm;

export const getSimilarFilms = (state) => state[NameSpace.FILM].similarFilms;

export const getNewCommentErrorCode = (state) => state[NameSpace.FILM].newCommentErrorCode;

export const getCurrentFilmComments = (state) => state[NameSpace.FILM].currentFilmComments;

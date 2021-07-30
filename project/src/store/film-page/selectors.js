import {NameSpace} from '../root-reducer';

export const getCurrentFilm = (state) => state[NameSpace.FILM].currentFilm;
export const getSimilarFilms = (state) => state[NameSpace.FILM].similarFilms;
export const getSimilarFilmsErrorCode = (state) => state[NameSpace.FILM].similarFilmsErrorCode;
export const getFilmCommentsErrorCode = (state) => state[NameSpace.FILM].filmCommentsErrorCode;
export const getNewCommentErrorCode = (state) => state[NameSpace.FILM].newCommentErrorCode;
export const getCurrentFilmComments = (state) => state[NameSpace.FILM].currentFilmComments;

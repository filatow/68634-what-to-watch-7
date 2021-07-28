import {createAction} from '@reduxjs/toolkit';

export const ActionType = {
  SET_FILTER_CATEGORY: 'main/setFilterCategory',
  LOAD_FILMS: 'main/loadFilms',
  LOAD_PROMOTED_FILM: 'main/loadPromotedFilm',
  REQUIRE_AUTHORIZATION: 'user/requireAuthorization',
  LOGOUT: 'user/logout',
  LOAD_AUTH_INFO: 'user/loadAuthInfo',
  RESET_AUTH_INFO: 'user/resetAuthInfo',
  LOAD_FAVORITE_FILMS: 'favorite/loadFavoriteFilms',
  LOAD_CURRENT: 'film/loadCurrent',
  LOAD_SIMILAR: 'film/loadSimilar',
  LOAD_COMMENTS: 'film/loadComments',
  ADD_NEW_COMMENT: 'film/addNewComment',
  CATCH_NEW_COMMENT_ERROR: 'film/catchNewCommentError',
  NULLIFY_NEW_COMMENT_ERROR_CODE: 'film/nullifyNewCommentErrorCode',
  START_LOADING: 'loading/start',
  STOP_LOADING: 'loading/stop',
  REDIRECT_TO_ROUTE: 'middleware/redirectToRoute',
};

export const setFilterCategory = createAction(
  ActionType.SET_FILTER_CATEGORY,
  (filterCategory) => ({
    payload: filterCategory,
  }),
);

export const loadFilms = createAction(
  ActionType.LOAD_FILMS,
  (films) => ({
    payload: films,
  }),
);

export const loadPromotedFilm = createAction(
  ActionType.LOAD_PROMOTED_FILM,
  (film) => ({
    payload: film,
  }),
);

export const loadCurrentFilm = createAction(
  ActionType.LOAD_CURRENT,
  (film) => ({
    payload: film,
  }),
);

export const loadSimilarFilms = createAction(
  ActionType.LOAD_SIMILAR,
  (films) => ({
    payload: films,
  }),
);

export const loadFavoriteFilms = createAction(
  ActionType.LOAD_FAVORITE_FILMS,
  (films) => ({
    payload: films,
  }),
);

export const loadFilmComments = createAction(
  ActionType.LOAD_COMMENTS,
  (comments) => ({
    payload: comments,
  }),
);

export const addNewComment = createAction(
  ActionType.ADD_NEW_COMMENT,
  (comment) => ({
    payload: comment,
  }),
);

export const catchNewCommentError = createAction(
  ActionType.CATCH_NEW_COMMENT_ERROR,
  (httpCode) => ({
    payload: httpCode,
  }),
);

export const nullifyNewCommentErrorCode = createAction(
  ActionType.NULLIFY_NEW_COMMENT_ERROR_CODE,
);

export const startLoading = createAction(
  ActionType.START_LOADING,
  (dataName) => ({
    payload: dataName,
  }),
);

export const stopLoading = createAction(
  ActionType.STOP_LOADING,
  (dataName) => ({
    payload: dataName,
  }),
);

export const requireAuthorization = createAction(
  ActionType.REQUIRE_AUTHORIZATION,
  (status) => ({
    payload: status,
  }),
);

export const logout = createAction(
  ActionType.LOGOUT,
);

export const loadAuthInfo = createAction(
  ActionType.LOAD_AUTH_INFO,
  (authInfo) => ({
    payload: authInfo,
  }),
);

export const resetAuthInfo = createAction(
  ActionType.RESET_AUTH_INFO,
);

export const redirectToRoute = createAction(
  ActionType.REDIRECT_TO_ROUTE,
  (url) => ({
    payload: url,
  }),
);

import {createAction} from '@reduxjs/toolkit';

export const ActionType = {
  SET_FILTER_CATEGORY: 'main/setFilterCategory',
  LOAD_FILMS: 'main/loadFilms',
  CATCH_FILMS_ERROR: 'main/catchFilmsError',
  LOAD_PROMOTED_FILM: 'main/loadPromotedFilm',
  CATCH_PROMOTED_FILM_ERROR: 'main/catchPromotedFilmError',
  REQUIRE_AUTHORIZATION: 'user/requireAuthorization',
  CATCH_AUTHORIZATION_ERROR: 'user/catchAuthorizationError',
  NULLIFY_AUTHORIZATION_ERROR_CODE: 'user/nullifyAuthorizationErrorCode',
  LOGOUT: 'user/logout',
  LOAD_AUTH_INFO: 'user/loadAuthInfo',
  RESET_AUTH_INFO: 'user/resetAuthInfo',
  LOAD_FAVORITE_FILMS: 'favorite/loadFavoriteFilms',
  CATCH_FAVORITE_FILMS_ERROR: 'favorite/catchFavoriteFilmsError',
  LOAD_CURRENT: 'film/loadCurrent',
  LOAD_SIMILAR: 'film/loadSimilar',
  CATCH_SIMILAR_ERROR: 'film/catchSimilarError',
  LOAD_COMMENTS: 'film/loadComments',
  CATCH_FILM_COMMENTS_ERROR: 'film/catchFilmCommentsError',
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

export const catchFilmListError = createAction(
  ActionType.CATCH_FILMS_ERROR,
  (httpCode) => ({
    payload: httpCode,
  }),
);

export const loadPromotedFilm = createAction(
  ActionType.LOAD_PROMOTED_FILM,
  (film) => ({
    payload: film,
  }),
);

export const catchPromotedFilmError = createAction(
  ActionType.CATCH_PROMOTED_FILM_ERROR,
  (httpCode) => ({
    payload: httpCode,
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

export const catchSimilarFilmsError = createAction(
  ActionType.CATCH_SIMILAR_ERROR,
  (httpCode) => ({
    payload: httpCode,
  }),
);

export const catchFavoriteFilmsError = createAction(
  ActionType.CATCH_FAVORITE_FILMS_ERROR,
  (httpCode) => ({
    payload: httpCode,
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

export const catchFilmCommentsError = createAction(
  ActionType.CATCH_FILM_COMMENTS_ERROR,
  (httpCode) => ({
    payload: httpCode,
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

export const catchAuthorizationError = createAction(
  ActionType.CATCH_AUTHORIZATION_ERROR,
  (httpCode) => ({
    payload: httpCode,
  }),
);

export const nullifyAuthorizationErrorCode = createAction(
  ActionType.NULLIFY_AUTHORIZATION_ERROR_CODE,
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

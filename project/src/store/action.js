export const ActionType = {
  SET_FILTER_CATEGORY: 'main/setFilterCategory',
  LOAD_FILMS: 'main/loadFilms',
  LOAD_PROMOTED_FILM: 'main/loadPromotedFilm',
  REQUIRE_AUTHORIZATION: 'user/requireAuthorization',
  LOGOUT: 'user/logout',
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


export const setFilterCategory = (FilterCategory) => ({
  type: ActionType.SET_FILTER_CATEGORY,
  payload: FilterCategory,
});

export const loadFilms = (films) => ({
  type: ActionType.LOAD_FILMS,
  payload: films,
});
export const loadPromotedFilm = (film) => ({
  type: ActionType.LOAD_PROMOTED_FILM,
  payload: film,
});

export const loadCurrentFilm = (film) => ({
  type: ActionType.LOAD_CURRENT,
  payload: film,
});

export const loadSimilarFilms = (films) => ({
  type: ActionType.LOAD_SIMILAR,
  payload: films,
});

export const loadFavoriteFilms = (films) => ({
  type: ActionType.LOAD_FAVORITE_FILMS,
  payload: films,
});
export const loadFilmComments = (comments) => ({
  type: ActionType.LOAD_COMMENTS,
  payload: comments,
});

export const addNewComment = (comment) => ({
  type: ActionType.ADD_NEW_COMMENT,
  payload: comment,
});

export const catchNewCommentError = (httpCode) => ({
  type: ActionType.CATCH_NEW_COMMENT_ERROR,
  payload: httpCode,
});

export const nullifyNewCommentErrorCode = () => ({
  type: ActionType.NULLIFY_NEW_COMMENT_ERROR_CODE,
});

export const startLoading = (dataName) => ({
  type: ActionType.START_LOADING,
  payload: dataName,
});

export const stopLoading = (dataName) => ({
  type: ActionType.STOP_LOADING,
  payload: dataName,
});

export const requireAuthorization = (status) => ({
  type: ActionType.REQUIRE_AUTHORIZATION,
  payload: status,
});

export const logout = () => ({
  type: ActionType.LOGOUT,
});

export const redirectToRoute = (url) => ({
  type: ActionType.REDIRECT_TO_ROUTE,
  payload: url,
});

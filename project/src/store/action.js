export const ActionType = {
  SET_FILTER_CATEGORY: 'set-filter-category',
  LOAD_FILMS: 'load-films',
  LOAD_PROMOTED_FILM: 'load-promoted-film',
  LOAD_CURRENT_FILM: 'load-current-film',
  LOAD_SIMILAR_FILMS: 'load-similar-films',
  LOAD_FAVORITE_FILMS: 'load-favorite-films',
  LOAD_FILM_COMMENTS: 'load-film-comments',
  ADD_NEW_COMMENT: 'add-new-comment',
  CATCH_NEW_COMMENT_ERROR: 'catch-new-comment-error',
  NULLIFY_NEW_COMMENT_ERROR_CODE: 'nullify-new-comment-error-code',
  START_LOADING: 'start-loading',
  STOP_LOADING: 'stop-loading',
  REQUIRE_AUTHORIZATION: 'require-authorization',
  LOGOUT: 'logout',
  REDIRECT_TO_ROUTE: 'redirect-to-route',
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
  type: ActionType.LOAD_CURRENT_FILM,
  payload: film,
});

export const loadSimilarFilms = (films) => ({
  type: ActionType.LOAD_SIMILAR_FILMS,
  payload: films,
});

export const loadFavoriteFilms = (films) => ({
  type: ActionType.LOAD_FAVORITE_FILMS,
  payload: films,
});
export const loadFilmComments = (comments) => ({
  type: ActionType.LOAD_FILM_COMMENTS,
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

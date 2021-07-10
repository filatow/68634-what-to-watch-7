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

export const ActionCreator = {
  setFilterCategory: (FilterCategory) => ({
    type: ActionType.SET_FILTER_CATEGORY,
    payload: FilterCategory,
  }),
  loadFilms: (films) => ({
    type: ActionType.LOAD_FILMS,
    payload: films,
  }),
  loadPromotedFilm: (film) => ({
    type: ActionType.LOAD_PROMOTED_FILM,
    payload: film,
  }),
  loadCurrentFilm: (film) => ({
    type: ActionType.LOAD_CURRENT_FILM,
    payload: film,
  }),
  loadSimilarFilms: (films) => ({
    type: ActionType.LOAD_SIMILAR_FILMS,
    payload: films,
  }),
  loadFavoriteFilms: (films) => ({
    type: ActionType.LOAD_FAVORITE_FILMS,
    payload: films,
  }),
  loadFilmComments: (comments) => ({
    type: ActionType.LOAD_FILM_COMMENTS,
    payload: comments,
  }),
  addNewComment: (comment) => ({
    type: ActionType.ADD_NEW_COMMENT,
    payload: comment,
  }),
  catchNewCommentError: (httpCode) => ({
    type: ActionType.CATCH_NEW_COMMENT_ERROR,
    payload: httpCode,
  }),
  nullifyNewCommentErrorCode: () => ({
    type: ActionType.NULLIFY_NEW_COMMENT_ERROR_CODE,
  }),
  startLoading: (dataName) => ({
    type: ActionType.START_LOADING,
    payload: dataName,
  }),
  stopLoading: (dataName) => ({
    type: ActionType.STOP_LOADING,
    payload: dataName,
  }),
  requireAuthorization: (status) => ({
    type: ActionType.REQUIRE_AUTHORIZATION,
    payload: status,
  }),
  logout: () => ({
    type: ActionType.LOGOUT,
  }),
  redirectToRoute: (url) => ({
    type: ActionType.REDIRECT_TO_ROUTE,
    payload: url,
  }),
};

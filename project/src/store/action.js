export const ActionType = {
  SET_FILTER_CATEGORY: 'set-filter-category',
  LOAD_FILMS: 'load-films',
  LOAD_PROMOTED_FILM: 'load-promoted-film',
  REQUIRE_AUTHORIZATION: 'require-authorization',
  LOGOUT: 'logout',
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
  requireAuthorization: (status) => ({
    type: ActionType.REQUIRE_AUTHORIZATION,
    payload: status,
  }),
  logout: () => ({
    type: ActionCreator.LOGOUT,
  }),
};

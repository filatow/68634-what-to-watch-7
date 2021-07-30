export const HttpCode = {
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
};

export const AppRoute = {
  MAIN: '/',
  LOGIN: '/login',
  MYLIST: '/mylist',
  FILMS: '/films',
  REVIEW: '/review',
  PLAYER: '/player',
};

export const APIRoute = {
  FILMS: '/films',
  SIMILAR: '/similar',
  COMMENTS: '/comments',
  LOGIN: '/login',
  LOGOUT: '/logout',
  PROMO: '/promo',
  FAVORITE: '/favorite',
};

export const FilmCategory = {
  ALL_GENRES: 'All genres',
};

export const AuthorizationStatus = {
  AUTH: 'auth',
  NO_AUTH: 'no-auth',
  UNKNOWN: 'unknown',
};

export const LoadedData = {
  FILMS: 'films',
  CURRENT_FILM: 'currentFilm',
  FILM_COMMENTS: 'filmComments',
  SIMILAR_FILMS: 'similarFilms',
  PROMOTED_FILM: 'promotedFilm',
  FAVORITE_FILMS: 'favoriteFilms',
};

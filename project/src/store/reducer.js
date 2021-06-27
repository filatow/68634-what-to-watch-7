import {FilmCategory, AuthorizationStatus} from './../consts';
import {ActionType} from './../store/action';

const initialState = {
  films: [],
  promotedFilm: {},
  filterCategory: FilmCategory.ALL_GENRES,
  filteredFilms: [],
  authorizationStatus: AuthorizationStatus.UNKNOWN,
  areFilmsLoaded: false,
  isPromotedFilmLoaded: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SET_FILTER_CATEGORY:
      return {
        ...state,
        filterCategory: action.payload,
        filteredFilms: (action.payload === FilmCategory.ALL_GENRES)
          ? state.films
          : state.films.filter((film) => film.genre === action.payload),
      };
    case ActionType.LOAD_FILMS:
      return {
        ...state,
        films: action.payload,
        filteredFilms: action.payload,
        areFilmsLoaded: true,
      };
    case ActionType.LOAD_PROMOTED_FILM:
      return {
        ...state,
        promotedFilm: action.payload,
        isPromotedFilmLoaded: true,
      };
    case ActionType.REQUIRE_AUTHORIZATION:
      return {
        ...state,
        authorizationStatus: action.payload,
      };
    case ActionType.LOGOUT:
      return {
        ...state,
        authorizationStatus: AuthorizationStatus.NO_AUTH,
      };
    default:
      return state;
  }
};

export {reducer};

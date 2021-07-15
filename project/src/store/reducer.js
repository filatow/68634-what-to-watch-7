import {FilmCategory, AuthorizationStatus, LoadedData} from './../consts';
import {ActionType} from './../store/action';

const getLoadingObject = (source = {}) => Array.from(Object.values(source))
  .reduce((accum, value) => {
    accum[value] = false;
    return accum;
  }, {});

const initialState = {
  films: [],
  promotedFilm: {},
  currentFilm: {},
  currentFilmComments: [],
  similarFilms: [],
  favoriteFilms: [],
  isLoading: getLoadingObject(LoadedData),
  filterCategory: FilmCategory.ALL_GENRES,
  filteredFilms: [],
  authorizationStatus: AuthorizationStatus.UNKNOWN,
  newCommentErrorCode: null,
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
      };
    case ActionType.LOAD_PROMOTED_FILM:
      return {
        ...state,
        promotedFilm: action.payload,
      };
    case ActionType.LOAD_CURRENT_FILM:
      return {
        ...state,
        currentFilm: action.payload,
      };
    case ActionType.LOAD_FAVORITE_FILMS:
      return {
        ...state,
        favoriteFilms: action.payload,
      };
    case ActionType.LOAD_FILM_COMMENTS:
      return {
        ...state,
        currentFilmComments: action.payload,
      };
    case ActionType.ADD_NEW_COMMENT:
      return {
        ...state,
        currentFilmComments: action.payload,
      };
    case ActionType.NULLIFY_NEW_COMMENT_ERROR_CODE:
      return {
        ...state,
        currentFilmComments: null,
      };
    case ActionType.CATCH_NEW_COMMENT_ERROR:
      return {
        ...state,
        newCommentErrorCode: action.payload,
      };
    case ActionType.LOAD_SIMILAR_FILMS:
      return {
        ...state,
        similarFilms: action.payload,
      };
    case ActionType.START_LOADING:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          [action.payload]: true,
        },
      };
    case ActionType.STOP_LOADING:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          [action.payload]: false,
        },
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

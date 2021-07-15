import {ActionType} from '../action';
import {FilmCategory} from '../../consts';

const initialState = {
  films: [],
  promotedFilm: {},
  filterCategory: FilmCategory.ALL_GENRES,
  filteredFilms: [],
};

const mainPage = (state = initialState, action) => {
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
    default:
      return state;
  }
};

export {mainPage};

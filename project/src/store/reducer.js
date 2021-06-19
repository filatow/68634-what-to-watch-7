import films from './../mocks/films';
import {FilmCategory} from './../consts';
import {ActionType} from './../store/action';

const initialState = {
  films: films,
  filterCategory: FilmCategory.ALL_GENRES,
  filteredFilms: films,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SET_FILTER_CATEGORY:
      return {
        ...state,
        filterCategory: action.payload,
        filteredFilms: (action.payload === FilmCategory.ALL_GENRES)
          ? films
          : films.filter((film) => film.genre === action.payload),
      };
    default:
      return state;
  }
};

export {reducer};

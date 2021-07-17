import {loadFilms, loadPromotedFilm, setFilterCategory} from '../action';
import {createReducer} from '@reduxjs/toolkit';
import {FilmCategory} from '../../consts';

const initialState = {
  films: [],
  promotedFilm: {},
  filterCategory: FilmCategory.ALL_GENRES,
  filteredFilms: [],
};

const mainPage = createReducer(initialState, (builder) => {
  builder
    .addCase(loadFilms, (state, action) => {
      state.films = action.payload;
      state.filteredFilms = action.payload;
    })
    .addCase(setFilterCategory, (state, action) => {
      state.filterCategory = action.payload;
      state.filteredFilms = (action.payload === FilmCategory.ALL_GENRES)
        ? state.films
        : state.films.filter((film) => film.genre === action.payload);
    })
    .addCase(loadPromotedFilm, (state, action) => {
      state.promotedFilm = action.payload;
    });
});

export {mainPage};

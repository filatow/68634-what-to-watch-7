import {loadFilms, loadPromotedFilm, setFilterCategory} from '../action';
import {createReducer} from '@reduxjs/toolkit';
import {FilmCategory} from '../../consts';

const initialState = {
  films: [],
  promotedFilm: {},
  filterCategory: FilmCategory.ALL_GENRES,
};

const mainPage = createReducer(initialState, (builder) => {
  builder
    .addCase(loadFilms, (state, action) => {
      state.films = action.payload;
    })
    .addCase(setFilterCategory, (state, action) => {
      state.filterCategory = action.payload;
    })
    .addCase(loadPromotedFilm, (state, action) => {
      state.promotedFilm = action.payload;
    });
});

export {mainPage};

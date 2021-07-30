import {
  catchFilmListError,
  catchPromotedFilmError,
  loadFilms,
  loadPromotedFilm,
  setFilterCategory
} from '../action';
import {createReducer} from '@reduxjs/toolkit';
import {FilmCategory} from '../../consts';

const initialState = {
  films: [],
  filmsErrorCode: null,
  promotedFilm: {},
  promotedFilmErrorCode: null,
  filterCategory: FilmCategory.ALL_GENRES,
};

const mainPage = createReducer(initialState, (builder) => {
  builder
    .addCase(loadFilms, (state, action) => {
      state.films = action.payload;
    })
    .addCase(catchFilmListError, (state, action) => {
      state.filmsErrorCode = action.payload;
    })
    .addCase(setFilterCategory, (state, action) => {
      state.filterCategory = action.payload;
    })
    .addCase(loadPromotedFilm, (state, action) => {
      state.promotedFilm = action.payload;
    })
    .addCase(catchPromotedFilmError, (state, action) => {
      state.promotedFilmErrorCode = action.payload;
    });
});

export {mainPage};

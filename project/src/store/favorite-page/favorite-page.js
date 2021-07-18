import {createReducer} from '@reduxjs/toolkit';
import { loadFavoriteFilms } from '../action';


const initialState = {
  favoriteFilms: [],
};

const favoritePage = createReducer(initialState, (builder) => {
  builder
    .addCase(loadFavoriteFilms, (state, action) => {
      state.favoriteFilms = action.payload;
    });
});

export {favoritePage};

import {createReducer} from '@reduxjs/toolkit';
import {catchFavoriteFilmsError, loadFavoriteFilms} from '../action';


const initialState = {
  favoriteFilms: [],
  favoriteFilmsErrorCode: null,
};

const favoritePage = createReducer(initialState, (builder) => {
  builder
    .addCase(loadFavoriteFilms, (state, action) => {
      state.favoriteFilms = action.payload;
    })
    .addCase(catchFavoriteFilmsError, (state, action) => {
      state.favoriteFilmsErrorCode = action.payload;
    });
});

export {favoritePage};

import {
  addNewComment,
  catchNewCommentError,
  loadCurrentFilm,
  loadFilmComments,
  loadSimilarFilms,
  nullifyNewCommentErrorCode
} from '../action';
import {createReducer} from '@reduxjs/toolkit';

const initialState = {
  currentFilm: {},
  similarFilms: [],
  currentFilmComments: [],
  newCommentErrorCode: null,
};

const filmPage = createReducer(initialState, (builder) => {
  builder
    .addCase(loadCurrentFilm, (state, action) => {
      state.currentFilm = action.payload;
    })
    .addCase(loadSimilarFilms, (state, action) => {
      state.similarFilms = action.payload;
    })
    .addCase(loadFilmComments, (state, action) => {
      state.currentFilmComments = action.payload;
    })
    .addCase(addNewComment, (state, action) => {
      state.currentFilmComments = action.payload;
    })
    .addCase(catchNewCommentError, (state, action) => {
      state.newCommentErrorCode = action.payload;
    })
    .addCase(nullifyNewCommentErrorCode, (state) => {
      state.newCommentErrorCode = null;
    });
});


export {filmPage};


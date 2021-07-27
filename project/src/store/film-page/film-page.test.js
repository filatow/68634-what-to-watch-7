import {ActionType} from '../action';
import {filmPage} from './film-page';

describe('Reducer: filmPage', () => {
  it('without additional parameters should return initial state', () => {
    const initialState = {
      currentFilm: {},
      similarFilms: [],
      currentFilmComments: [],
      newCommentErrorCode: null,
    };

    expect(filmPage(initialState, {})).toEqual({
      ...initialState,
    });
  });

  it('should set currentFilm with payload', () => {
    const initialState = {
      currentFilm: {},
      similarFilms: [],
      currentFilmComments: [],
      newCommentErrorCode: null,
    };

    const loadCurrentFilmAction = {
      type: ActionType.LOAD_CURRENT,
      payload: 'current film',
    };

    expect(filmPage(initialState, loadCurrentFilmAction)).toEqual({
      ...initialState,
      currentFilm: 'current film',
    });
  });

  it('should set similarFilms with payload', () => {
    const initialState = {
      currentFilm: {},
      similarFilms: [],
      currentFilmComments: [],
      newCommentErrorCode: null,
    };

    const loadSimilarFilmsAction = {
      type: ActionType.LOAD_SIMILAR,
      payload: ['similar film-1', 'similar film-2', 'similar film-3'],
    };

    expect(filmPage(initialState, loadSimilarFilmsAction)).toEqual({
      ...initialState,
      similarFilms: ['similar film-1', 'similar film-2', 'similar film-3'],
    });
  });

  it('should set currentFilmComments with payload', () => {
    const initialState = {
      currentFilm: {},
      similarFilms: [],
      currentFilmComments: [],
      newCommentErrorCode: null,
    };

    const loadFilmCommentsAction = {
      type: ActionType.LOAD_COMMENTS,
      payload: ['comment-1', 'comment-2', 'comment-3'],
    };

    expect(filmPage(initialState, loadFilmCommentsAction)).toEqual({
      ...initialState,
      currentFilmComments: ['comment-1', 'comment-2', 'comment-3'],
    });
  });

  it('should set currentFilmComments (including new user comment) with payload', () => {
    const initialState = {
      currentFilm: {},
      similarFilms: [],
      currentFilmComments: ['comment-1', 'comment-2', 'comment-3'],
      newCommentErrorCode: null,
    };

    const addNewCommentAction = {
      type: ActionType.ADD_NEW_COMMENT,
      payload: ['comment-1', 'comment-2', 'comment-3', 'new commetn'],
    };

    expect(filmPage(initialState, addNewCommentAction)).toEqual({
      ...initialState,
      currentFilmComments: ['comment-1', 'comment-2', 'comment-3', 'new commetn'],
    });
  });

  it('should set newCommentErrorCode with payload', () => {
    const initialState = {
      currentFilm: {},
      similarFilms: [],
      currentFilmComments: [],
      newCommentErrorCode: null,
    };

    const catchNewCommentErrorAction = {
      type: ActionType.CATCH_NEW_COMMENT_ERROR,
      payload: 401,
    };

    expect(filmPage(initialState, catchNewCommentErrorAction)).toEqual({
      ...initialState,
      newCommentErrorCode: 401,
    });
  });

  it('should set newCommentErrorCode with null', () => {
    const initialState = {
      currentFilm: {},
      similarFilms: [],
      currentFilmComments: [],
      newCommentErrorCode: 401,
    };

    const nullifyNewCommentErrorCodeAction = {
      type: ActionType.NULLIFY_NEW_COMMENT_ERROR_CODE,
    };

    expect(filmPage(initialState, nullifyNewCommentErrorCodeAction)).toEqual({
      ...initialState,
      newCommentErrorCode: null,
    });
  });
});

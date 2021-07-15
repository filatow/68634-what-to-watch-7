import {ActionType} from '../action';

const initialState = {
  currentFilm: {},
  similarFilms: [],
  currentFilmComments: [],
  newCommentErrorCode: null,
};


const filmPage = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOAD_CURRENT:
      return {
        ...state,
        currentFilm: action.payload,
      };
    case ActionType.LOAD_SIMILAR:
      return {
        ...state,
        similarFilms: action.payload,
      };
    case ActionType.LOAD_COMMENTS:
      return {
        ...state,
        currentFilmComments: action.payload,
      };
    case ActionType.ADD_NEW_COMMENT:
      return {
        ...state,
        currentFilmComments: action.payload,
      };
    case ActionType.CATCH_NEW_COMMENT_ERROR:
      return {
        ...state,
        newCommentErrorCode: action.payload,
      };
    case ActionType.NULLIFY_NEW_COMMENT_ERROR_CODE:
      return {
        ...state,
        newCommentErrorCode: null,
      };
    default:
      return state;
  }
};

export {filmPage};

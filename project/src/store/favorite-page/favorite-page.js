import {ActionType} from '../action';

const initialState = {
  favoriteFilms: [],
};


const favoritePage = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOAD_FAVORITE_FILMS:
      return {
        ...state,
        favoriteFilms: action.payload,
      };
    default:
      return state;
  }
};

export {favoritePage};

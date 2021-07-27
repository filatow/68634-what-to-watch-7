import {favoritePage} from './favorite-page';
import {ActionType} from '../action';

describe('Reducer: favoritePage', () => {
  it('without additional parameters should return initial state', () => {
    const initialState = {
      favoriteFilms: ['favorite film-1', 'favorite film-2', 'favorite film-3'],
    };

    expect(favoritePage(initialState, {})).toEqual({
      ...initialState,
    });
  });

  it('sould set favoriteFilms with payload', () => {
    const initialState = {
      favoriteFilms: [],
    };

    const loadFavoriteFilmsAction = {
      type: ActionType.LOAD_FAVORITE_FILMS,
      payload: ['favorite film-1', 'favorite film-2', 'favorite film-3'],
    };

    expect(favoritePage(initialState, loadFavoriteFilmsAction)).toEqual({
      favoriteFilms: ['favorite film-1', 'favorite film-2', 'favorite film-3'],
    });
  });
});

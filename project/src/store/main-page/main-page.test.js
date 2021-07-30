import {FilmCategory} from '../../consts';
import {ActionType} from '../action';
import {mainPage} from './main-page';

describe('Reducer: mainPage', () => {
  it('without additional parameters should return initial state', () => {
    const initialState = {
      films: [],
      promotedFilm: {},
      filterCategory: FilmCategory.ALL_GENRES,
      filteredFilms: [],
    };
    const expectedState = {
      films: [],
      promotedFilm: {},
      filterCategory: FilmCategory.ALL_GENRES,
      filteredFilms: [],
    };

    expect(mainPage(initialState, {})).toEqual(expectedState);
  });

  it.skip('should place loaded films into state filds films and filteredFilms', () => {
    const initialState = {
      films: [],
      promotedFilm: {},
      filterCategory: FilmCategory.ALL_GENRES,
      filteredFilms: [],
    };
    const loadFilmsAction = {
      type: ActionType.LOAD_FILMS,
      payload: ['loaded film-1', 'loaded film-2'],
    };

    expect(mainPage(initialState, loadFilmsAction)).toEqual({
      ...initialState,
      films: ['loaded film-1', 'loaded film-2'],
      filteredFilms: ['loaded film-1', 'loaded film-2'],
    });
  });

  it.skip('should fill filterCategory with payload and filter filteredFilms according to payload',
    () => {
      const initialState = {
        films: [
          {name: 'film-1', genre: 'horror'},
          {name: 'film-2', genre: 'drama'},
          {name: 'film-3', genre: 'action'},
          {name: 'film-4', genre: 'horror'},
          {name: 'film-5', genre: 'drama'},
          {name: 'film-6', genre: 'horror'},
        ],
        promotedFilm: {},
        filterCategory: 'drama',
        filteredFilms: [
          {name: 'film-2', genre: 'drama'},
          {name: 'film-5', genre: 'drama'},
        ],
      };

      const setAllGenresFilterCategoryAction = {
        type: ActionType.SET_FILTER_CATEGORY,
        payload: FilmCategory.ALL_GENRES,
      };

      expect(mainPage(initialState, setAllGenresFilterCategoryAction)).toEqual({
        ...initialState,
        filterCategory: FilmCategory.ALL_GENRES,
        filteredFilms: [
          ...initialState.films,
        ],
      });

      const setHorrorFilterCategoryAction = {
        type: ActionType.SET_FILTER_CATEGORY,
        payload: 'horror',
      };

      expect(mainPage(initialState, setHorrorFilterCategoryAction)).toEqual({
        ...initialState,
        filterCategory: 'horror',
        filteredFilms: [
          {name: 'film-1', genre: 'horror'},
          {name: 'film-4', genre: 'horror'},
          {name: 'film-6', genre: 'horror'},
        ],
      });

      const setComedyFilterCategoryAction = {
        type: ActionType.SET_FILTER_CATEGORY,
        payload: 'comedy',
      };

      expect(mainPage(initialState, setComedyFilterCategoryAction)).toEqual({
        ...initialState,
        filterCategory: 'comedy',
        filteredFilms: [],
      });

    });

  it('should fill promoted film with payload', () => {
    const initialState = {
      films: [],
      promotedFilm: {},
      filterCategory: FilmCategory.ALL_GENRES,
      filteredFilms: [],
    };
    const loadPromotedFilm = {
      type: ActionType.LOAD_PROMOTED_FILM,
      payload: 'promoted film',
    };

    expect(mainPage(initialState, loadPromotedFilm)).toEqual({
      ...initialState,
      promotedFilm: 'promoted film',
    });

  });
});

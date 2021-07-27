import {
  setFilterCategory,
  loadFilms,
  loadPromotedFilm,
  loadCurrentFilm,
  loadSimilarFilms,
  loadFavoriteFilms,
  loadFilmComments,
  addNewComment,
  catchNewCommentError,
  nullifyNewCommentErrorCode,
  startLoading,
  stopLoading,
  requireAuthorization,
  logout,
  redirectToRoute,
  ActionType
} from './action';

describe('Actions', () => {
  it('action creator for setting filter category returns action with received category name', () => {
    const expectedAction = {
      type: ActionType.SET_FILTER_CATEGORY,
      payload: 'All',
    };

    expect(setFilterCategory('All')).toEqual(expectedAction);
  });

  it('action creator for setting films returns action with received array of films', () => {
    const expectedAction = {
      type: ActionType.LOAD_FILMS,
      payload: ['film1', 'film2', 'film3'],
    };

    expect(loadFilms(['film1', 'film2', 'film3'])).toEqual(expectedAction);
  });

  it('action creator for setting promo film returns action with received promo film', () => {
    const expectedAction = {
      type: ActionType.LOAD_PROMOTED_FILM,
      payload: 'promo film',
    };

    expect(loadPromotedFilm('promo film')).toEqual(expectedAction);
  });

  it('action creator for setting current film returns action with received current film', () => {
    const expectedAction = {
      type: ActionType.LOAD_CURRENT,
      payload: 'promo film',
    };

    expect(loadCurrentFilm('promo film')).toEqual(expectedAction);
  });

  it('action creator for setting similar films returns action with received array of similar films',
    () => {
      const expectedAction = {
        type: ActionType.LOAD_SIMILAR,
        payload: ['film1', 'film2', 'film3'],
      };

      expect(loadSimilarFilms(['film1', 'film2', 'film3'])).toEqual(expectedAction);
    });

  it('action creator for setting favorite films returns action with received array of favorite films',
    () => {
      const expectedAction = {
        type: ActionType.LOAD_FAVORITE_FILMS,
        payload: ['film1', 'film2', 'film3'],
      };

      expect(loadFavoriteFilms(['film1', 'film2', 'film3'])).toEqual(expectedAction);
    });

  it('action creator for setting film comments returns action with received array of film comments',
    () => {
      const expectedAction = {
        type: ActionType.LOAD_COMMENTS,
        payload: ['comment1', 'comment2', 'comment3'],
      };

      expect(loadFilmComments(['comment1', 'comment2', 'comment3'])).toEqual(expectedAction);
    });

  it('action creator for adding new comment returns action with film comments including new one',  () => {
    const expectedAction = {
      type: ActionType.ADD_NEW_COMMENT,
      payload: ['comment1', 'comment2', 'new comment'],
    };

    expect(addNewComment(['comment1', 'comment2', 'new comment'])).toEqual(expectedAction);
  });

  it('action creator for setting http code of catched error while adding new comment returns http code of error', () => {
    const expectedAction = {
      type: ActionType.CATCH_NEW_COMMENT_ERROR,
      payload: 401,
    };

    expect(catchNewCommentError(401)).toEqual(expectedAction);
  });

  it('action creator for nullifying http code of catched new comment adding error returns action with undefined payload', () => {
    const expectedAction = {
      type: ActionType.NULLIFY_NEW_COMMENT_ERROR_CODE,
    };

    expect(nullifyNewCommentErrorCode()).toEqual(expectedAction);
  });

  it('action creator to indicate the start of loading process returns action with loaded data name as a payload', () => {
    const expectedAction = {
      type: ActionType.START_LOADING,
      payload: 'Data name',
    };

    expect(startLoading('Data name')).toEqual(expectedAction);
  });

  it('action creator to indicate the stopage of loading process returns action with loaded data name as a payload', () => {
    const expectedAction = {
      type: ActionType.STOP_LOADING,
      payload: 'Data name',
    };

    expect(stopLoading('Data name')).toEqual(expectedAction);
  });

  it('action creator for setting authorization status returns action with actual authorization status as a payload', () => {
    const expectedAction = {
      type: ActionType.REQUIRE_AUTHORIZATION,
      payload: 'authorizationStatus',
    };

    expect(requireAuthorization('authorizationStatus')).toEqual(expectedAction);
  });

  it('action creator to logout returns action with undefined payload', () => {
    const expectedAction = {
      type: ActionType.LOGOUT,
    };

    expect(logout()).toEqual(expectedAction);
  });

  it('action creator for redirection returns action with url for redirection as a payload', () => {
    const expectedAction = {
      type: ActionType.REDIRECT_TO_ROUTE,
      payload: 'url',
    };

    expect(redirectToRoute('url')).toEqual(expectedAction);
  });
});

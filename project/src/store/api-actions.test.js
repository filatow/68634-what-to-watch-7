import MockAdapter from 'axios-mock-adapter';
import {createAPI} from '../services/api';
import {ActionType} from './action';
import {
  fetchFilmList,
  fetchPromotedFilm,
  fetchCurrentFilm,
  fetchSimilarFilms,
  fetchFavoriteFilms,
  fetchFilmComments,
  checkAuth,
  login,
  logout,
  postComment,
  setFilmFavoriteStatus,
  setPromotedFilmFavoriteStatus
} from './api-actions';
import {
  APIRoute, AppRoute, AuthorizationStatus, LoadedData
} from '../consts';

let api = null;

describe('Async operations', () => {
  beforeAll(() => {
    api = createAPI(() => {});
  });

  it('should make a correct API call to GET /films', () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const filmListLoader = fetchFilmList();
    const fakeFilmList = [
      {
        'id': 1,
        'name': 'The Grand Budapest Hotel',
        'poster_image': 'img/the-grand-budapest-hotel-poster.jpg',
        'preview_image': 'img/the-grand-budapest-hotel.jpg',
        'background_image': 'img/the-grand-budapest-hotel-bg.jpg',
        'background_color': '#ffffff',
        'video_link': 'https://some-link',
        'preview_video_link': 'https://some-link',
        'description': 'Long description',
        'rating': 8.9,
        'scores_count': 240,
        'director': 'Wes Andreson',
        'starring': ['Bill Murray', 'Edward Norton', 'Jude Law', 'Willem Dafoe', 'Saoirse Ronan'],
        'run_time': 99,
        'genre': 'Comedy',
        'released': 2014,
        'is_favorite': false,
      },
      {
        'id': 2,
        'name': 'Pulp Fiction',
        'poster_image': 'img/pulp-fiction-poster.jpg',
        'preview_image': 'img/pulp-fiction.jpg',
        'background_image': 'img/pulp-fiction-bg.jpg',
        'background_color': '#795433',
        'video_link': 'https://some-link',
        'preview_video_link': 'https://some-link',
        'description': 'Long description',
        'rating': 7.8,
        'scores_count': 330,
        'director': 'Quentin Tarantino',
        'starring': ['John Travolta', 'Uma Thurman', 'Samuel L. Jackson'],
        'run_time': 153,
        'genre': 'Crime',
        'released': 1994,
        'is_favorite': false,
      },
    ];
    const adaptedFakeFilmList = [
      {
        'id': 1,
        'title': 'The Grand Budapest Hotel',
        'poster': 'img/the-grand-budapest-hotel-poster.jpg',
        'cover': 'img/the-grand-budapest-hotel.jpg',
        'backgroundImage': 'img/the-grand-budapest-hotel-bg.jpg',
        'backgroundColor': '#ffffff',
        'video': 'https://some-link',
        'previewVideo': 'https://some-link',
        'description': 'Long description',
        'rating': 8.9,
        'voteCount': 240,
        'director': 'Wes Andreson',
        'starring': ['Bill Murray', 'Edward Norton', 'Jude Law', 'Willem Dafoe', 'Saoirse Ronan'],
        'duration': 99,
        'genre': 'Comedy',
        'release': 2014,
        'isFavorite': false,
      },
      {
        'id': 2,
        'title': 'Pulp Fiction',
        'poster': 'img/pulp-fiction-poster.jpg',
        'cover': 'img/pulp-fiction.jpg',
        'backgroundImage': 'img/pulp-fiction-bg.jpg',
        'backgroundColor': '#795433',
        'video': 'https://some-link',
        'previewVideo': 'https://some-link',
        'description': 'Long description',
        'rating': 7.8,
        'voteCount': 330,
        'director': 'Quentin Tarantino',
        'starring': ['John Travolta', 'Uma Thurman', 'Samuel L. Jackson'],
        'duration': 153,
        'genre': 'Crime',
        'release': 1994,
        'isFavorite': false,
      },
    ];

    apiMock
      .onGet(APIRoute.FILMS)
      .reply(200, fakeFilmList);

    return filmListLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(3);

        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.START_LOADING,
          payload: LoadedData.FILMS,
        });

        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.LOAD_FILMS,
          payload: adaptedFakeFilmList,
        });

        expect(dispatch).toHaveBeenNthCalledWith(3, {
          type: ActionType.STOP_LOADING,
          payload: LoadedData.FILMS,
        });
      });

  });

  it('should make a correct API call to GET /promo', () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const promotedFilmLoader = fetchPromotedFilm();
    const fakePromotedFilm = {
      'id': 1,
      'name': 'The Grand Budapest Hotel',
      'poster_image': 'img/the-grand-budapest-hotel-poster.jpg',
      'preview_image': 'img/the-grand-budapest-hotel.jpg',
      'background_image': 'img/the-grand-budapest-hotel-bg.jpg',
      'background_color': '#ffffff',
      'video_link': 'https://some-link',
      'preview_video_link': 'https://some-link',
      'description': 'Long description',
      'rating': 8.9,
      'scores_count': 240,
      'director': 'Wes Andreson',
      'starring': ['Bill Murray', 'Edward Norton', 'Jude Law', 'Willem Dafoe', 'Saoirse Ronan'],
      'run_time': 99,
      'genre': 'Comedy',
      'released': 2014,
      'is_favorite': false,
    };
    const adaptedFakePromotedFilm = {
      'id': 1,
      'title': 'The Grand Budapest Hotel',
      'poster': 'img/the-grand-budapest-hotel-poster.jpg',
      'cover': 'img/the-grand-budapest-hotel.jpg',
      'backgroundImage': 'img/the-grand-budapest-hotel-bg.jpg',
      'backgroundColor': '#ffffff',
      'video': 'https://some-link',
      'previewVideo': 'https://some-link',
      'description': 'Long description',
      'rating': 8.9,
      'voteCount': 240,
      'director': 'Wes Andreson',
      'starring': ['Bill Murray', 'Edward Norton', 'Jude Law', 'Willem Dafoe', 'Saoirse Ronan'],
      'duration': 99,
      'genre': 'Comedy',
      'release': 2014,
      'isFavorite': false,
    };

    apiMock
      .onGet(APIRoute.PROMO)
      .reply(200, fakePromotedFilm);

    return promotedFilmLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(3);

        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.START_LOADING,
          payload: LoadedData.PROMOTED_FILM,
        });

        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.LOAD_PROMOTED_FILM,
          payload: adaptedFakePromotedFilm,
        });

        expect(dispatch).toHaveBeenNthCalledWith(3, {
          type: ActionType.STOP_LOADING,
          payload: LoadedData.PROMOTED_FILM,
        });
      });

  });

  it('should make a correct API call to GET /films/1', () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const currentFilmLoader = fetchCurrentFilm(1);
    const fakeCurrentFilm = {
      'id': 1,
      'name': 'The Grand Budapest Hotel',
      'poster_image': 'img/the-grand-budapest-hotel-poster.jpg',
      'preview_image': 'img/the-grand-budapest-hotel.jpg',
      'background_image': 'img/the-grand-budapest-hotel-bg.jpg',
      'background_color': '#ffffff',
      'video_link': 'https://some-link',
      'preview_video_link': 'https://some-link',
      'description': 'Long description',
      'rating': 8.9,
      'scores_count': 240,
      'director': 'Wes Andreson',
      'starring': ['Bill Murray', 'Edward Norton', 'Jude Law', 'Willem Dafoe', 'Saoirse Ronan'],
      'run_time': 99,
      'genre': 'Comedy',
      'released': 2014,
      'is_favorite': false,
    };
    const adaptedFakeCurrentFilm = {
      'id': 1,
      'title': 'The Grand Budapest Hotel',
      'poster': 'img/the-grand-budapest-hotel-poster.jpg',
      'cover': 'img/the-grand-budapest-hotel.jpg',
      'backgroundImage': 'img/the-grand-budapest-hotel-bg.jpg',
      'backgroundColor': '#ffffff',
      'video': 'https://some-link',
      'previewVideo': 'https://some-link',
      'description': 'Long description',
      'rating': 8.9,
      'voteCount': 240,
      'director': 'Wes Andreson',
      'starring': ['Bill Murray', 'Edward Norton', 'Jude Law', 'Willem Dafoe', 'Saoirse Ronan'],
      'duration': 99,
      'genre': 'Comedy',
      'release': 2014,
      'isFavorite': false,
    };

    apiMock
      .onGet(`${APIRoute.FILMS}/1`)
      .reply(200, fakeCurrentFilm);

    return currentFilmLoader(dispatch, () => {}, api)
      .then(() => {

        expect(dispatch).toHaveBeenCalledTimes(3);

        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.START_LOADING,
          payload: LoadedData.CURRENT_FILM,
        });

        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.LOAD_CURRENT,
          payload: adaptedFakeCurrentFilm,
        });

        expect(dispatch).toHaveBeenNthCalledWith(3, {
          type: ActionType.STOP_LOADING,
          payload: LoadedData.CURRENT_FILM,
        });
      });

  });

  it('should make a correct API call to GET /films/3/similar', () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const similarFilmsLoader = fetchSimilarFilms(3);
    const fakeFilmList = [
      {
        'id': 1,
        'name': 'The Grand Budapest Hotel',
        'poster_image': 'img/the-grand-budapest-hotel-poster.jpg',
        'preview_image': 'img/the-grand-budapest-hotel.jpg',
        'background_image': 'img/the-grand-budapest-hotel-bg.jpg',
        'background_color': '#ffffff',
        'video_link': 'https://some-link',
        'preview_video_link': 'https://some-link',
        'description': 'Long description',
        'rating': 8.9,
        'scores_count': 240,
        'director': 'Wes Andreson',
        'starring': ['Bill Murray', 'Edward Norton', 'Jude Law', 'Willem Dafoe', 'Saoirse Ronan'],
        'run_time': 99,
        'genre': 'Comedy',
        'released': 2014,
        'is_favorite': false,
      },
      {
        'id': 2,
        'name': 'Pulp Fiction',
        'poster_image': 'img/pulp-fiction-poster.jpg',
        'preview_image': 'img/pulp-fiction.jpg',
        'background_image': 'img/pulp-fiction-bg.jpg',
        'background_color': '#795433',
        'video_link': 'https://some-link',
        'preview_video_link': 'https://some-link',
        'description': 'Long description',
        'rating': 7.8,
        'scores_count': 330,
        'director': 'Quentin Tarantino',
        'starring': ['John Travolta', 'Uma Thurman', 'Samuel L. Jackson'],
        'run_time': 153,
        'genre': 'Crime',
        'released': 1994,
        'is_favorite': false,
      },
    ];
    const adaptedFakeFilmList = [
      {
        'id': 1,
        'title': 'The Grand Budapest Hotel',
        'poster': 'img/the-grand-budapest-hotel-poster.jpg',
        'cover': 'img/the-grand-budapest-hotel.jpg',
        'backgroundImage': 'img/the-grand-budapest-hotel-bg.jpg',
        'backgroundColor': '#ffffff',
        'video': 'https://some-link',
        'previewVideo': 'https://some-link',
        'description': 'Long description',
        'rating': 8.9,
        'voteCount': 240,
        'director': 'Wes Andreson',
        'starring': ['Bill Murray', 'Edward Norton', 'Jude Law', 'Willem Dafoe', 'Saoirse Ronan'],
        'duration': 99,
        'genre': 'Comedy',
        'release': 2014,
        'isFavorite': false,
      },
      {
        'id': 2,
        'title': 'Pulp Fiction',
        'poster': 'img/pulp-fiction-poster.jpg',
        'cover': 'img/pulp-fiction.jpg',
        'backgroundImage': 'img/pulp-fiction-bg.jpg',
        'backgroundColor': '#795433',
        'video': 'https://some-link',
        'previewVideo': 'https://some-link',
        'description': 'Long description',
        'rating': 7.8,
        'voteCount': 330,
        'director': 'Quentin Tarantino',
        'starring': ['John Travolta', 'Uma Thurman', 'Samuel L. Jackson'],
        'duration': 153,
        'genre': 'Crime',
        'release': 1994,
        'isFavorite': false,
      },
    ];

    apiMock
      .onGet(`${APIRoute.FILMS}/3${APIRoute.SIMILAR}`)
      .reply(200, fakeFilmList);

    return similarFilmsLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(3);

        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.START_LOADING,
          payload: LoadedData.SIMILAR_FILMS,
        });

        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.LOAD_SIMILAR,
          payload: adaptedFakeFilmList,
        });

        expect(dispatch).toHaveBeenNthCalledWith(3, {
          type: ActionType.STOP_LOADING,
          payload: LoadedData.SIMILAR_FILMS,
        });
      });

  });

  it('should make a correct API call to GET /favorite', () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const favoriteFilmsLoader = fetchFavoriteFilms();
    const fakeFilmList = [
      {
        'id': 1,
        'name': 'The Grand Budapest Hotel',
        'poster_image': 'img/the-grand-budapest-hotel-poster.jpg',
        'preview_image': 'img/the-grand-budapest-hotel.jpg',
        'background_image': 'img/the-grand-budapest-hotel-bg.jpg',
        'background_color': '#ffffff',
        'video_link': 'https://some-link',
        'preview_video_link': 'https://some-link',
        'description': 'Long description',
        'rating': 8.9,
        'scores_count': 240,
        'director': 'Wes Andreson',
        'starring': ['Bill Murray', 'Edward Norton', 'Jude Law', 'Willem Dafoe', 'Saoirse Ronan'],
        'run_time': 99,
        'genre': 'Comedy',
        'released': 2014,
        'is_favorite': false,
      },
      {
        'id': 2,
        'name': 'Pulp Fiction',
        'poster_image': 'img/pulp-fiction-poster.jpg',
        'preview_image': 'img/pulp-fiction.jpg',
        'background_image': 'img/pulp-fiction-bg.jpg',
        'background_color': '#795433',
        'video_link': 'https://some-link',
        'preview_video_link': 'https://some-link',
        'description': 'Long description',
        'rating': 7.8,
        'scores_count': 330,
        'director': 'Quentin Tarantino',
        'starring': ['John Travolta', 'Uma Thurman', 'Samuel L. Jackson'],
        'run_time': 153,
        'genre': 'Crime',
        'released': 1994,
        'is_favorite': false,
      },
    ];
    const adaptedFakeFilmList = [
      {
        'id': 1,
        'title': 'The Grand Budapest Hotel',
        'poster': 'img/the-grand-budapest-hotel-poster.jpg',
        'cover': 'img/the-grand-budapest-hotel.jpg',
        'backgroundImage': 'img/the-grand-budapest-hotel-bg.jpg',
        'backgroundColor': '#ffffff',
        'video': 'https://some-link',
        'previewVideo': 'https://some-link',
        'description': 'Long description',
        'rating': 8.9,
        'voteCount': 240,
        'director': 'Wes Andreson',
        'starring': ['Bill Murray', 'Edward Norton', 'Jude Law', 'Willem Dafoe', 'Saoirse Ronan'],
        'duration': 99,
        'genre': 'Comedy',
        'release': 2014,
        'isFavorite': false,
      },
      {
        'id': 2,
        'title': 'Pulp Fiction',
        'poster': 'img/pulp-fiction-poster.jpg',
        'cover': 'img/pulp-fiction.jpg',
        'backgroundImage': 'img/pulp-fiction-bg.jpg',
        'backgroundColor': '#795433',
        'video': 'https://some-link',
        'previewVideo': 'https://some-link',
        'description': 'Long description',
        'rating': 7.8,
        'voteCount': 330,
        'director': 'Quentin Tarantino',
        'starring': ['John Travolta', 'Uma Thurman', 'Samuel L. Jackson'],
        'duration': 153,
        'genre': 'Crime',
        'release': 1994,
        'isFavorite': false,
      },
    ];

    apiMock
      .onGet(APIRoute.FAVORITE)
      .reply(200, fakeFilmList);

    return favoriteFilmsLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(3);

        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.START_LOADING,
          payload: LoadedData.FAVORITE_FILMS,
        });

        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.LOAD_FAVORITE_FILMS,
          payload: adaptedFakeFilmList,
        });

        expect(dispatch).toHaveBeenNthCalledWith(3, {
          type: ActionType.STOP_LOADING,
          payload: LoadedData.FAVORITE_FILMS,
        });
      });

  });

  it('should make a correct API call to GET /comments/1', () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const filmCommentsLoader = fetchFilmComments(1);
    const fakeFilmComments = ['comment-1', 'comment-2'];

    apiMock
      .onGet(`${APIRoute.COMMENTS}/1`)
      .reply(200, fakeFilmComments);

    return filmCommentsLoader(dispatch, () => {}, api)
      .then(() => {

        expect(dispatch).toHaveBeenCalledTimes(3);

        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.START_LOADING,
          payload: LoadedData.FILM_COMMENTS,
        });

        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.LOAD_COMMENTS,
          payload: fakeFilmComments,
        });

        expect(dispatch).toHaveBeenNthCalledWith(3, {
          type: ActionType.STOP_LOADING,
          payload: LoadedData.FILM_COMMENTS,
        });
      });

  });

  it.skip('should make a correct API call to GET /login', () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const checkAuthLoader = checkAuth();
    const fakeAuthInfo = 'AuthInfoObject';

    apiMock
      .onGet(APIRoute.LOGIN)
      .reply(200, fakeAuthInfo);

    return checkAuthLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.REQUIRE_AUTHORIZATION,
          payload: AuthorizationStatus.AUTH,
        });
      });

  });

  it.skip('should make a correct API call to POST /login', () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const fakeUser = {login: 'some@mail.com', password: 'qwerty'};
    const loginLoader = login(fakeUser);
    const fakeAuthInfo = 'AuthInfoObject';

    apiMock
      .onPost(APIRoute.LOGIN)
      .reply(200, fakeAuthInfo);

    return loginLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);

        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.REQUIRE_AUTHORIZATION,
          payload: AuthorizationStatus.AUTH,
        });

        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.REDIRECT_TO_ROUTE,
          payload: AppRoute.MAIN,
        });
      });
  });

  it.skip('should make a correct API call to DELETE /logout', () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const logoutLoader = logout();

    apiMock
      .onDelete(APIRoute.LOGOUT)
      .reply(204);

    return logoutLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);

        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOGOUT,
        });
      });
  });

  it('should make a correct API call to POST /comments/1', () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const fakeNewComment = 'new comment';
    const postCommentLoader = postComment(1, fakeNewComment);
    const fakeFilmCommentWithNewComment = ['comment-1', 'comment-2', fakeNewComment];

    apiMock
      .onPost(`${APIRoute.COMMENTS}/1`, fakeNewComment)
      .reply(200, fakeFilmCommentWithNewComment);

    return postCommentLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);

        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.ADD_NEW_COMMENT,
          payload: fakeFilmCommentWithNewComment,
        });

        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.REDIRECT_TO_ROUTE,
          payload: `${AppRoute.FILMS}/1`,
        });
      });
  });

  it('should make a correct API call to POST /favorite/1/1 (set current film favoriteStatus to true)', () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const setFilmFavoriteStatusLoader = setFilmFavoriteStatus(1, 1);
    const fakeCurrentFilm = {
      'id': 1,
      'name': 'The Grand Budapest Hotel',
      'poster_image': 'img/the-grand-budapest-hotel-poster.jpg',
      'preview_image': 'img/the-grand-budapest-hotel.jpg',
      'background_image': 'img/the-grand-budapest-hotel-bg.jpg',
      'background_color': '#ffffff',
      'video_link': 'https://some-link',
      'preview_video_link': 'https://some-link',
      'description': 'Long description',
      'rating': 8.9,
      'scores_count': 240,
      'director': 'Wes Andreson',
      'starring': ['Bill Murray', 'Edward Norton', 'Jude Law', 'Willem Dafoe', 'Saoirse Ronan'],
      'run_time': 99,
      'genre': 'Comedy',
      'released': 2014,
      'is_favorite': true,
    };
    const adaptedFakeCurrentFilm = {
      'id': 1,
      'title': 'The Grand Budapest Hotel',
      'poster': 'img/the-grand-budapest-hotel-poster.jpg',
      'cover': 'img/the-grand-budapest-hotel.jpg',
      'backgroundImage': 'img/the-grand-budapest-hotel-bg.jpg',
      'backgroundColor': '#ffffff',
      'video': 'https://some-link',
      'previewVideo': 'https://some-link',
      'description': 'Long description',
      'rating': 8.9,
      'voteCount': 240,
      'director': 'Wes Andreson',
      'starring': ['Bill Murray', 'Edward Norton', 'Jude Law', 'Willem Dafoe', 'Saoirse Ronan'],
      'duration': 99,
      'genre': 'Comedy',
      'release': 2014,
      'isFavorite': true,
    };

    apiMock
      .onPost(`${APIRoute.FAVORITE}/1/1`)
      .reply(200, fakeCurrentFilm);

    return setFilmFavoriteStatusLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(3);

        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.START_LOADING,
          payload: LoadedData.CURRENT_FILM,
        });

        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.LOAD_CURRENT,
          payload: adaptedFakeCurrentFilm,
        });

        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.LOAD_CURRENT,
          payload: expect.objectContaining({'isFavorite': true}),
        });

        expect(dispatch).toHaveBeenNthCalledWith(3, {
          type: ActionType.STOP_LOADING,
          payload: LoadedData.CURRENT_FILM,
        });
      });
  });

  it('should make a correct API call to POST /favorite/1/0 (set current film favoriteStatus to false)', () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const setFilmFavoriteStatusLoader = setFilmFavoriteStatus(1, 0);
    const fakeCurrentFilm = {
      'id': 1,
      'name': 'The Grand Budapest Hotel',
      'poster_image': 'img/the-grand-budapest-hotel-poster.jpg',
      'preview_image': 'img/the-grand-budapest-hotel.jpg',
      'background_image': 'img/the-grand-budapest-hotel-bg.jpg',
      'background_color': '#ffffff',
      'video_link': 'https://some-link',
      'preview_video_link': 'https://some-link',
      'description': 'Long description',
      'rating': 8.9,
      'scores_count': 240,
      'director': 'Wes Andreson',
      'starring': ['Bill Murray', 'Edward Norton', 'Jude Law', 'Willem Dafoe', 'Saoirse Ronan'],
      'run_time': 99,
      'genre': 'Comedy',
      'released': 2014,
      'is_favorite': false,
    };
    const adaptedFakeCurrentFilm = {
      'id': 1,
      'title': 'The Grand Budapest Hotel',
      'poster': 'img/the-grand-budapest-hotel-poster.jpg',
      'cover': 'img/the-grand-budapest-hotel.jpg',
      'backgroundImage': 'img/the-grand-budapest-hotel-bg.jpg',
      'backgroundColor': '#ffffff',
      'video': 'https://some-link',
      'previewVideo': 'https://some-link',
      'description': 'Long description',
      'rating': 8.9,
      'voteCount': 240,
      'director': 'Wes Andreson',
      'starring': ['Bill Murray', 'Edward Norton', 'Jude Law', 'Willem Dafoe', 'Saoirse Ronan'],
      'duration': 99,
      'genre': 'Comedy',
      'release': 2014,
      'isFavorite': false,
    };

    apiMock
      .onPost(`${APIRoute.FAVORITE}/1/0`)
      .reply(200, fakeCurrentFilm);

    return setFilmFavoriteStatusLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(3);

        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.START_LOADING,
          payload: LoadedData.CURRENT_FILM,
        });

        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.LOAD_CURRENT,
          payload: adaptedFakeCurrentFilm,
        });

        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.LOAD_CURRENT,
          payload: expect.objectContaining({'isFavorite': false}),
        });

        expect(dispatch).toHaveBeenNthCalledWith(3, {
          type: ActionType.STOP_LOADING,
          payload: LoadedData.CURRENT_FILM,
        });
      });
  });

  it('should make a correct API call to POST /favorite/1/1 (set promoted film favoriteStatus to true)', () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const setPromotedFilmFavoriteStatusLoader = setPromotedFilmFavoriteStatus(1, 1);
    const fakePromotedFilm = {
      'id': 1,
      'name': 'The Grand Budapest Hotel',
      'poster_image': 'img/the-grand-budapest-hotel-poster.jpg',
      'preview_image': 'img/the-grand-budapest-hotel.jpg',
      'background_image': 'img/the-grand-budapest-hotel-bg.jpg',
      'background_color': '#ffffff',
      'video_link': 'https://some-link',
      'preview_video_link': 'https://some-link',
      'description': 'Long description',
      'rating': 8.9,
      'scores_count': 240,
      'director': 'Wes Andreson',
      'starring': ['Bill Murray', 'Edward Norton', 'Jude Law', 'Willem Dafoe', 'Saoirse Ronan'],
      'run_time': 99,
      'genre': 'Comedy',
      'released': 2014,
      'is_favorite': true,
    };
    const adaptedFakePromotedFilm = {
      'id': 1,
      'title': 'The Grand Budapest Hotel',
      'poster': 'img/the-grand-budapest-hotel-poster.jpg',
      'cover': 'img/the-grand-budapest-hotel.jpg',
      'backgroundImage': 'img/the-grand-budapest-hotel-bg.jpg',
      'backgroundColor': '#ffffff',
      'video': 'https://some-link',
      'previewVideo': 'https://some-link',
      'description': 'Long description',
      'rating': 8.9,
      'voteCount': 240,
      'director': 'Wes Andreson',
      'starring': ['Bill Murray', 'Edward Norton', 'Jude Law', 'Willem Dafoe', 'Saoirse Ronan'],
      'duration': 99,
      'genre': 'Comedy',
      'release': 2014,
      'isFavorite': true,
    };

    apiMock
      .onPost(`${APIRoute.FAVORITE}/1/1`)
      .reply(200, fakePromotedFilm);

    return setPromotedFilmFavoriteStatusLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(3);

        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.START_LOADING,
          payload: LoadedData.PROMOTED_FILM,
        });

        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.LOAD_PROMOTED_FILM,
          payload: adaptedFakePromotedFilm,
        });

        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.LOAD_PROMOTED_FILM,
          payload: expect.objectContaining({'isFavorite': true}),
        });

        expect(dispatch).toHaveBeenNthCalledWith(3, {
          type: ActionType.STOP_LOADING,
          payload: LoadedData.PROMOTED_FILM,
        });
      });
  });

  it('should make a correct API call to POST /favorite/1/0 (set promoted film favoriteStatus to false)', () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const setPromotedFilmFavoriteStatusLoader = setPromotedFilmFavoriteStatus(1, 0);
    const fakePromotedFilm = {
      'id': 1,
      'name': 'The Grand Budapest Hotel',
      'poster_image': 'img/the-grand-budapest-hotel-poster.jpg',
      'preview_image': 'img/the-grand-budapest-hotel.jpg',
      'background_image': 'img/the-grand-budapest-hotel-bg.jpg',
      'background_color': '#ffffff',
      'video_link': 'https://some-link',
      'preview_video_link': 'https://some-link',
      'description': 'Long description',
      'rating': 8.9,
      'scores_count': 240,
      'director': 'Wes Andreson',
      'starring': ['Bill Murray', 'Edward Norton', 'Jude Law', 'Willem Dafoe', 'Saoirse Ronan'],
      'run_time': 99,
      'genre': 'Comedy',
      'released': 2014,
      'is_favorite': false,
    };
    const adaptedFakePromotedFilm = {
      'id': 1,
      'title': 'The Grand Budapest Hotel',
      'poster': 'img/the-grand-budapest-hotel-poster.jpg',
      'cover': 'img/the-grand-budapest-hotel.jpg',
      'backgroundImage': 'img/the-grand-budapest-hotel-bg.jpg',
      'backgroundColor': '#ffffff',
      'video': 'https://some-link',
      'previewVideo': 'https://some-link',
      'description': 'Long description',
      'rating': 8.9,
      'voteCount': 240,
      'director': 'Wes Andreson',
      'starring': ['Bill Murray', 'Edward Norton', 'Jude Law', 'Willem Dafoe', 'Saoirse Ronan'],
      'duration': 99,
      'genre': 'Comedy',
      'release': 2014,
      'isFavorite': false,
    };

    apiMock
      .onPost(`${APIRoute.FAVORITE}/1/0`)
      .reply(200, fakePromotedFilm);

    return setPromotedFilmFavoriteStatusLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(3);

        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.START_LOADING,
          payload: LoadedData.PROMOTED_FILM,
        });

        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.LOAD_PROMOTED_FILM,
          payload: adaptedFakePromotedFilm,
        });

        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.LOAD_PROMOTED_FILM,
          payload: expect.objectContaining({'isFavorite': false}),
        });

        expect(dispatch).toHaveBeenNthCalledWith(3, {
          type: ActionType.STOP_LOADING,
          payload: LoadedData.PROMOTED_FILM,
        });
      });
  });
});

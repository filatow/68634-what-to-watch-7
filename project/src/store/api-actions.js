import {
  loadCurrentFilm,
  loadFavoriteFilms,
  loadFilmComments,
  loadFilms,
  loadPromotedFilm,
  loadSimilarFilms,
  redirectToRoute,
  requireAuthorization,
  startLoading,
  stopLoading,
  logout as userLogout,
  addNewComment,
  catchNewCommentError,
  loadAuthInfo,
  resetAuthInfo,
  catchAuthorizationError,
  catchPromotedFilmError,
  catchFilmCommentsError,
  catchFilmListError,
  catchSimilarFilmsError,
  catchFavoriteFilmsError
} from './action';
import {AuthorizationStatus,AppRoute, APIRoute, LoadedData} from '../consts';
import {adaptFilmToClient, adaptAuthInfoToClient} from '../utils';

export const fetchFilmList = () => (dispatch, _getState, api) => {
  dispatch(startLoading(LoadedData.FILMS));
  return api.get(APIRoute.FILMS)
    .then(({data}) => dispatch(loadFilms(
      data.map((film) => adaptFilmToClient(film)),
    )))
    .catch(({response}) => dispatch(catchFilmListError(response.status)))
    .finally(() => dispatch(stopLoading(LoadedData.FILMS)));
};

export const fetchPromotedFilm = () => (dispatch, _getState, api) => {
  dispatch(startLoading(LoadedData.PROMOTED_FILM));
  return api.get(APIRoute.PROMO)
    .then(({data}) => dispatch(loadPromotedFilm(adaptFilmToClient(data))))
    .catch(({response}) => dispatch(catchPromotedFilmError(response.status)))
    .finally(() => dispatch(stopLoading(LoadedData.PROMOTED_FILM)));
};

export const fetchCurrentFilm = (filmId) => (dispatch, _getState, api) => {
  dispatch(startLoading(LoadedData.CURRENT_FILM));
  return api.get(`${APIRoute.FILMS}/${filmId}`)
    .then(({data}) => dispatch(loadCurrentFilm(adaptFilmToClient(data))))
    .catch(() => {})
    .finally(() => dispatch(stopLoading(LoadedData.CURRENT_FILM)));
};

export const fetchSimilarFilms = (filmId) => (dispatch, _getState, api) => {
  dispatch(startLoading(LoadedData.SIMILAR_FILMS));
  return api.get(`${APIRoute.FILMS}/${filmId}${APIRoute.SIMILAR}`)
    .then(({data}) => dispatch(loadSimilarFilms(
      data.map((film) => adaptFilmToClient(film)),
    )))
    .catch(({response}) => dispatch(catchSimilarFilmsError(response.status)))
    .finally(() => dispatch(stopLoading(LoadedData.SIMILAR_FILMS)));
};

export const fetchFavoriteFilms = () => (dispatch, _getState, api) => {
  dispatch(startLoading(LoadedData.FAVORITE_FILMS));
  return api.get(APIRoute.FAVORITE)
    .then(({data}) => dispatch(loadFavoriteFilms(
      data.map((film) => adaptFilmToClient(film)),
    )))
    .catch(({response}) => dispatch(catchFavoriteFilmsError(response.status)))
    .finally(() => dispatch(stopLoading(LoadedData.FAVORITE_FILMS)));
};

export const fetchFilmComments = (filmId) => (dispatch, _getState, api) => {
  dispatch(startLoading(LoadedData.FILM_COMMENTS));
  return api.get(`${APIRoute.COMMENTS}/${filmId}`)
    .then(({data}) => dispatch(loadFilmComments(data)))
    .catch(({response}) => dispatch(catchFilmCommentsError(response.status)))
    .finally(() => dispatch(stopLoading(LoadedData.FILM_COMMENTS)));
};

export const checkAuth = () => (dispatch, _getState, api) =>
  api.get(APIRoute.LOGIN)
    .then(({data}) => {
      dispatch(loadAuthInfo(adaptAuthInfoToClient(data)));
      localStorage.setItem('token', data.token);
    })
    .then(() => dispatch(requireAuthorization(AuthorizationStatus.AUTH)))
    .catch(() => {});

export const login = ({login: email, password}) => (dispatch, _getState, api) =>
  api.post(APIRoute.LOGIN, {email, password})
    .then(({data}) => {
      dispatch(loadAuthInfo(adaptAuthInfoToClient(data)));
      localStorage.setItem('token', data.token);
    })
    .then(() => api.defaults.headers['x-token'] = localStorage.getItem('token'))
    .then(() => dispatch(requireAuthorization(AuthorizationStatus.AUTH)))
    .then(() => dispatch(redirectToRoute(AppRoute.MAIN)))
    .catch(({response}) => dispatch(catchAuthorizationError(response.status)));

export const logout = () => (dispatch, _getState, api) =>
  api.delete(APIRoute.LOGOUT)
    .then(() => localStorage.removeItem('token'))
    .then(() => dispatch(resetAuthInfo()))
    .then(() => dispatch(userLogout()));

export const postComment = (filmId, newComment) => (dispatch, _getState, api) =>
  api.post(`${APIRoute.COMMENTS}/${filmId}`, newComment)
    .then(({data}) => dispatch(addNewComment(data)))
    .then(() => dispatch(redirectToRoute(`${AppRoute.FILMS}/${filmId}`)))
    .catch(({response}) => dispatch(catchNewCommentError(response.status)));

export const setFilmFavoriteStatus = (filmId, statusId) => (dispatch, _getState, api) => {
  dispatch(startLoading(LoadedData.CURRENT_FILM));
  return api.post(`${APIRoute.FAVORITE}/${filmId}/${statusId}`)
    .then(({data}) => dispatch(loadCurrentFilm(adaptFilmToClient(data))))
    .catch(() => {})
    .finally(() => dispatch(stopLoading(LoadedData.CURRENT_FILM)));
};

export const setPromotedFilmFavoriteStatus = (filmId, statusId) => (dispatch, _getState, api) => {
  dispatch(startLoading(LoadedData.PROMOTED_FILM));
  return api.post(`${APIRoute.FAVORITE}/${filmId}/${statusId}`)
    .then(({data}) => dispatch(loadPromotedFilm(adaptFilmToClient(data))))
    .catch(() => {})
    .finally(() => dispatch(stopLoading(LoadedData.PROMOTED_FILM)));
};

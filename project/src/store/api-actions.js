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
  catchNewCommentError
} from './action';
import {AuthorizationStatus,AppRoute, APIRoute, LoadedData} from '../consts';
import {adaptFilmToClient} from '../utils';

export const fetchFilmList = () => (dispatch, _getState, api) => {
  dispatch(startLoading(LoadedData.FILMS));
  api.get(APIRoute.FILMS)
    .then(({data}) => dispatch(loadFilms(
      data.map((film) => adaptFilmToClient(film)),
    )))
    .catch(() => {})
    .finally(() => dispatch(stopLoading(LoadedData.FILMS)));
};

export const fetchPromotedFilm = () => (dispatch, _getState, api) => {
  dispatch(startLoading(LoadedData.PROMOTED_FILM));
  api.get(APIRoute.PROMO)
    .then(({data}) => dispatch(loadPromotedFilm(adaptFilmToClient(data))))
    .catch(() => {})
    .finally(() => dispatch(stopLoading(LoadedData.PROMOTED_FILM)));
};

export const fetchCurrentFilm = (filmId) => (dispatch, _getState, api) => {
  dispatch(startLoading(LoadedData.CURRENT_FILM));
  api.get(`${APIRoute.FILMS}/${filmId}`)
    .then(({data}) => dispatch(loadCurrentFilm(adaptFilmToClient(data))))
    .catch(() => {})
    .finally(() => dispatch(stopLoading(LoadedData.CURRENT_FILM)));
};

export const fetchSimilarFilms = (filmId) => (dispatch, _getState, api) => {
  dispatch(startLoading(LoadedData.SIMILAR_FILMS));
  api.get(`${APIRoute.FILMS}/${filmId}${APIRoute.SIMILAR}`)
    .then(({data}) => dispatch(loadSimilarFilms(
      data.map((film) => adaptFilmToClient(film)),
    )))
    .catch(() => {})
    .finally(() => dispatch(stopLoading(LoadedData.SIMILAR_FILMS)));
};

export const fetchFavoriteFilms = (filmId) => (dispatch, _getState, api) => {
  dispatch(startLoading(LoadedData.FAVORITE_FILMS));
  api.get(APIRoute.FAVORITE)
    .then(({data}) => dispatch(loadFavoriteFilms(
      data.map((film) => adaptFilmToClient(film)),
    )))
    .catch(() => {})
    .finally(() => dispatch(stopLoading(LoadedData.FAVORITE_FILMS)));
};


export const fetchFilmComments = (filmId) => (dispatch, _getState, api) => {
  dispatch(startLoading(LoadedData.FILM_COMMENTS));
  api.get(`${APIRoute.COMMENTS}/${filmId}`)
    .then(({data}) => dispatch(loadFilmComments(data)))
    .finally(() => dispatch(stopLoading(LoadedData.FILM_COMMENTS)));
};


export const checkAuth = () => (dispatch, _getState, api) => {
  api.get(APIRoute.LOGIN)
    .then(() => dispatch(requireAuthorization(AuthorizationStatus.AUTH)))
    .catch(() => {});
};

export const login = ({login: email, password}) => (dispatch, _getState, api) => {
  api.post(APIRoute.LOGIN, {email, password})
    .then(({data}) => localStorage.setItem('token', data.token))
    .then(() => dispatch(requireAuthorization(AuthorizationStatus.AUTH)))
    .then(() => dispatch(redirectToRoute(AppRoute.MAIN)));
};

export const logout = () => (dispatch, _getState, api) => {
  api.delete(APIRoute.LOGOUT)
    .then(() => localStorage.removeItem('token'))
    .then(() => dispatch(userLogout()));
};

export const postComment = (filmId, newComment) => (dispatch, _getState, api) => {
  api.post(`${APIRoute.COMMENTS}/${filmId}`, newComment)
    .then(({data}) => dispatch(addNewComment(data)))
    .then(() => dispatch(redirectToRoute(`${AppRoute.FILMS}/${filmId}`)))
    .catch(({response}) => dispatch(catchNewCommentError(response.status)));
};

export const setFilmFavoriteStatus = (filmId, statusId) => (dispatch, _getState, api) => {
  dispatch(startLoading(LoadedData.CURRENT_FILM));
  api.post(`${APIRoute.FAVORITE}/${filmId}/${statusId}`)
    .then(({data}) => dispatch(loadCurrentFilm(adaptFilmToClient(data))))
    .finally(() => dispatch(stopLoading(LoadedData.CURRENT_FILM)));
};

export const setPromotedFilmFavoriteStatus = (filmId, statusId) => (dispatch, _getState, api) => {
  dispatch(startLoading(LoadedData.PROMOTED_FILM));
  api.post(`${APIRoute.FAVORITE}/${filmId}/${statusId}`)
    .then(({data}) => dispatch(loadPromotedFilm(adaptFilmToClient(data))))
    .finally(() => dispatch(stopLoading(LoadedData.PROMOTED_FILM)));
};

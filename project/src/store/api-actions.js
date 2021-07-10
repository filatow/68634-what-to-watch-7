import {ActionCreator} from './action';
import {AuthorizationStatus,AppRoute, APIRoute, LoadedData} from '../consts';
import {adaptFilmToClient} from '../utils';

export const fetchFilmList = () => (dispatch, _getState, api) => {
  dispatch(ActionCreator.startLoading(LoadedData.FILMS));
  api.get(APIRoute.FILMS)
    .then(({data}) => dispatch(ActionCreator.loadFilms(
      data.map((film) => adaptFilmToClient(film)),
    )))
    .catch(() => {})
    .finally(() => dispatch(ActionCreator.stopLoading(LoadedData.FILMS)));
};

export const fetchPromotedFilm = () => (dispatch, _getState, api) => {
  dispatch(ActionCreator.startLoading(LoadedData.PROMOTED_FILM));
  api.get(APIRoute.PROMO)
    .then(({data}) => dispatch(ActionCreator.loadPromotedFilm(adaptFilmToClient(data))))
    .catch(() => {})
    .finally(() => dispatch(ActionCreator.stopLoading(LoadedData.PROMOTED_FILM)));
};

export const fetchCurrentFilm = (filmId) => (dispatch, _getState, api) => {
  dispatch(ActionCreator.startLoading(LoadedData.CURRENT_FILM));
  api.get(`${APIRoute.FILMS}/${filmId}`)
    .then(({data}) => dispatch(ActionCreator.loadCurrentFilm(adaptFilmToClient(data))))
    .catch(() => {})
    .finally(() => dispatch(ActionCreator.stopLoading(LoadedData.CURRENT_FILM)));
};


export const fetchSimilarFilms = (filmId) => (dispatch, _getState, api) => {
  dispatch(ActionCreator.startLoading(LoadedData.SIMILAR_FILMS));
  api.get(`${APIRoute.FILMS}/${filmId}${APIRoute.SIMILAR}`)
    .then(({data}) => dispatch(ActionCreator.loadSimilarFilms(
      data.map((film) => adaptFilmToClient(film)),
    )))
    .catch(() => {})
    .finally(() => dispatch(ActionCreator.stopLoading(LoadedData.SIMILAR_FILMS)));
};

export const fetchFavoriteFilms = (filmId) => (dispatch, _getState, api) => {
  dispatch(ActionCreator.startLoading(LoadedData.FAVORITE_FILMS));
  api.get(APIRoute.FAVORITE)
    .then(({data}) => dispatch(ActionCreator.loadFavoriteFilms(
      data.map((film) => adaptFilmToClient(film)),
    )))
    .catch(() => {})
    .finally(() => dispatch(ActionCreator.stopLoading(LoadedData.FAVORITE_FILMS)));
};


export const fetchFilmComments = (filmId) => (dispatch, _getState, api) => {
  dispatch(ActionCreator.startLoading(LoadedData.FILM_COMMENTS));
  api.get(`${APIRoute.COMMENTS}/${filmId}`)
    .then(({data}) => dispatch(ActionCreator.loadFilmComments(data)))
    .finally(() => dispatch(ActionCreator.stopLoading(LoadedData.FILM_COMMENTS)));
};


export const checkAuth = () => (dispatch, _getState, api) => {
  api.get(APIRoute.LOGIN)
    .then(() => dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.AUTH)))
    .catch(() => {});
};

export const login = ({login: email, password}) => (dispatch, _getState, api) => {
  api.post(APIRoute.LOGIN, {email, password})
    .then(({data}) => localStorage.setItem('token', data.token))
    .then(() => dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.AUTH)))
    .then(() => dispatch(ActionCreator.redirectToRoute(AppRoute.MAIN)));
};

export const logout = () => (dispatch, _getState, api) => {
  api.delete(APIRoute.LOGOUT)
    .then(() => localStorage.removeItem('token'))
    .then(() => dispatch(ActionCreator.logout()));
};

export const postComment = (filmId, newComment) => (dispatch, _getState, api) => {
  api.post(`${APIRoute.COMMENTS}/${filmId}`, newComment)
    .then(({data}) => dispatch(ActionCreator.addNewComment(data)))
    .then(() => dispatch(ActionCreator.redirectToRoute(`${AppRoute.FILMS}/${filmId}`)))
    .catch(({response}) => dispatch(ActionCreator.catchNewCommentError(response.status)));
};

export const setFilmFavoriteStatus = (filmId, statusId) => (dispatch, _getState, api) => {
  dispatch(ActionCreator.startLoading(LoadedData.CURRENT_FILM));
  api.post(`${APIRoute.FAVORITE}/${filmId}/${statusId}`)
    .then(({data}) => dispatch(ActionCreator.loadCurrentFilm(adaptFilmToClient(data))))
    .finally(() => dispatch(ActionCreator.stopLoading(LoadedData.CURRENT_FILM)));
};

export const setPromotedFilmFavoriteStatus = (filmId, statusId) => (dispatch, _getState, api) => {
  dispatch(ActionCreator.startLoading(LoadedData.PROMOTED_FILM));
  api.post(`${APIRoute.FAVORITE}/${filmId}/${statusId}`)
    .then(({data}) => dispatch(ActionCreator.loadPromotedFilm(adaptFilmToClient(data))))
    .finally(() => dispatch(ActionCreator.stopLoading(LoadedData.PROMOTED_FILM)));
};

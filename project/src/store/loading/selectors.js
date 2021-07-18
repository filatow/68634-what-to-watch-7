import { LoadedData } from '../../consts';
import {NameSpace} from '../root-reducer';

export const isCurrentFilmLoading = (state) =>
  state[NameSpace.LOADING].isLoading[LoadedData.CURRENT_FILM];

export const isFavoriteFilmsLoading = (state) =>
  state[NameSpace.LOADING].isLoading[LoadedData.FAVORITE_FILMS];

export const isFilmCommentsLoading = (state) =>
  state[NameSpace.LOADING].isLoading[LoadedData.FILM_COMMENTS];

export const isFilmPageDataLoading = (state) =>
  state[NameSpace.LOADING].isLoading[LoadedData.CURRENT_FILM]
  || state[NameSpace.LOADING].isLoading[LoadedData.SIMILAR_FILMS];

export const isMainPageDataLoading = (state) =>
  state[NameSpace.LOADING].isLoading[LoadedData.PROMOTED_FILM]
  || state[NameSpace.LOADING].isLoading[LoadedData.FILMS];


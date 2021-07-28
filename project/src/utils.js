import {AuthorizationStatus} from './consts';
import React from 'react';

export const isAuthChecking = (authorizationStatus) =>
  authorizationStatus === AuthorizationStatus.UNKNOWN;

export const adaptFilmToClient = (film) => {
  const adaptedFilm = Object.assign(
    {},
    {
      id: film.id,
      poster: film.poster_image,
      cover: film.preview_image,
      backgroundImage: film.background_image,
      backgroundColor: film.background_color,
      video: film.video_link,
      previewVideo: film.preview_video_link,
      title: film.name,
      genre: film.genre,
      release: film.released,
      description: film.description,
      rating: film.rating,
      director: film.director,
      voteCount: film.scores_count,
      starring: film.starring,
      duration: film.run_time,
      isFavorite: film.is_favorite,
    },
  );

  return adaptedFilm;
};

export const adaptAuthInfoToClient = (authInfo) => {
  const adaptedAuthInfo = Object.assign(
    {},
    {
      id: authInfo.id,
      email: authInfo.email,
      name: authInfo.name,
      avatarUrl: authInfo.avatar_url,
      token: authInfo.token,
    },
  );

  return adaptedAuthInfo;
};

export const getLoadingObject = (
  source = {},
  defaultValue = false,
) => Array.from(Object.values(source))
  .reduce((accum, value) => {
    accum[value] = defaultValue;
    return accum;
  }, {});


export const getFormatedFilmDuration = (duration) => {
  const hour = Math.floor(duration / 60);
  const minute = duration - hour * 60;
  return `${hour}h ${minute}m`;
};

export const getFormatedFilmStarring = (starring) => starring.map((star, ind) => {
  if (ind !== starring.length - 1) {
    return (
      <React.Fragment key={star}>
        {star}, <br />
      </React.Fragment>);
  }
  return star;
});

export const determineRatingGrage = function(numericRating) {
  if (numericRating === 10) {
    return 'Awesome';
  } else if (numericRating >= 8) {
    return 'Very good';
  } else if (numericRating >= 5) {
    return 'Good';
  } else if (numericRating >= 3) {
    return 'Normal';
  } else {
    return 'Bad';
  }
};

export const getFormatedReviewDate = (date) => new Date(date).toLocaleDateString(
  'en-US',
  { month: 'long', day: 'numeric', year: 'numeric'});

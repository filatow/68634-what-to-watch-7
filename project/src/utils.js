import {AuthorizationStatus} from './consts';

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

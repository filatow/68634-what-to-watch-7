import React from 'react';
import filmProp from '../film/film.prop';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {AppRoute} from '../../consts';
import VideoPlayer from '../video-player/video-player';

function SmallFilmCard({film,onHover, isActive}) {
  const {cover, previewVideo, id, title} = film;
  const VIDEO_PLAYER_WIDTH = '280';
  const VIDEO_PLAYER_HEIGHT = '175';

  return (
    <article
      className="small-film-card catalog__films-card"
      onMouseEnter={() => {
        onHover(film);
      }}
      onMouseLeave={() => {
        onHover({});
      }}
    >

      <div className="small-film-card__video">
        <VideoPlayer
          cover={cover}
          src={previewVideo}
          width={VIDEO_PLAYER_WIDTH}
          height={VIDEO_PLAYER_HEIGHT}
          isActive={isActive}
          muted
        />
      </div>

      <h3 className="small-film-card__title">
        <Link className="small-film-card__link" to={`${AppRoute.FILMS}/${id}`}>{title}</Link>
      </h3>
    </article>
  );
}

SmallFilmCard.propTypes = {
  film: filmProp,
  onHover: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired,
};
export default SmallFilmCard;

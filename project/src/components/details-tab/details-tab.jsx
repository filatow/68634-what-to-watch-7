import React from 'react';
import filmProp from '../film/film.prop';
import {getFormatedFilmDuration, getFormatedFilmStarring} from '../../utils';

function DetailsTab({film}) {
  const {
    director,
    starring,
    duration,
    genre,
    release,
  } = film;

  const filmStarring = getFormatedFilmStarring(starring);
  const filmDuration = getFormatedFilmDuration(duration);

  return (
    <div className="film-card__text film-card__row">
      <div className="film-card__text-col">
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Director</strong>
          <span className="film-card__details-value">{director}</span>
        </p>
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Starring</strong>
          <span className="film-card__details-value" data-testid="film-starring">
            {filmStarring}
          </span>
        </p>
      </div>

      <div className="film-card__text-col">
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Run Time</strong>
          <span className="film-card__details-value" data-testid="film-duration">{filmDuration}</span>
        </p>
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Genre</strong>
          <span className="film-card__details-value">{genre}</span>
        </p>
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Released</strong>
          <span className="film-card__details-value">{release}</span>
        </p>
      </div>
    </div>
  );
}

DetailsTab.propTypes = {
  film: filmProp,
};

export default DetailsTab;


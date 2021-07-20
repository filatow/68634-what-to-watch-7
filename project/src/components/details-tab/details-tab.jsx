import React from 'react';
import filmProp from '../film/film.prop';

const formatedFilmDuration = (duration) => {
  const hour = Math.floor(duration / 60);
  const minute = duration - hour * 60;
  return `${hour}h ${minute}m`;
};
function DetailsTab({film}) {
  const {
    director,
    starring,
    duration,
    genre,
    release,
  } = film;

  const filmStarring = starring.map((star, ind) =>{
    if (ind !== starring.length - 1) {
      return (
        <React.Fragment key={star}>
          {star}, <br />
        </React.Fragment>);
    }
    return star;
  });
  const filmDuration = formatedFilmDuration(duration);

  return (
    <div className="film-card__text film-card__row">
      <div className="film-card__text-col">
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Director</strong>
          <span className="film-card__details-value">{director}</span>
        </p>
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Starring</strong>
          <span className="film-card__details-value">
            {filmStarring}
          </span>
        </p>
      </div>

      <div className="film-card__text-col">
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Run Time</strong>
          <span className="film-card__details-value">{filmDuration}</span>
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


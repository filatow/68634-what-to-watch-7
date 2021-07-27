import React from 'react';
import filmProp from '../film/film.prop';
import {determineRatingGrage} from '../../utils';

function OverviewTab({film}) {
  const {
    description,
    rating,
    voteCount,
    director,
    starring,
  } = film;

  const voteGrade = determineRatingGrage(rating);
  const filmStarring = starring.join(', ');

  return (
    <>
      <div className="film-rating">
        <div className="film-rating__score">{rating}</div>
        <p className="film-rating__meta">
          <span className="film-rating__level">{voteGrade}</span>
          <span className="film-rating__count">{voteCount} ratings</span>
        </p>
      </div>

      <div className="film-card__text">
        {description}
        <p className="film-card__director">
          <strong>Director: {director}</strong>
        </p>
        <p className="film-card__starring">
          <strong>Starring: {filmStarring} and other</strong>
        </p>
      </div>
    </>
  );
}

OverviewTab.propTypes = {
  film: filmProp,
};

export default OverviewTab;

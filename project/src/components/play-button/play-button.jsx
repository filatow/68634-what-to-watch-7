import React from 'react';
import PropTypes from 'prop-types';
import {AppRoute} from '../../consts';
import {Link} from 'react-router-dom';

function PlayButton({filmId}) {
  return (
    <Link
      to={`${AppRoute.PLAYER}/${filmId}`}
      className="btn btn--play film-card__button"
    >
      <svg viewBox="0 0 19 19" width="19" height="19">
        <use xlinkHref="#play-s"></use>
      </svg>
      <span>Play</span>
    </Link>
  );
}

PlayButton.propTypes = {
  filmId: PropTypes.number,
};

export default PlayButton;


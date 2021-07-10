import React from 'react';
import PropTypes from 'prop-types';
import {AppRoute} from '../../consts';
import {Link} from 'react-router-dom';

function ReviewButton({filmId}) {
  return (
    <Link
      to={`${AppRoute.FILMS}/${filmId}${AppRoute.REVIEW}`}
      className="btn film-card__button"
    >
      Add review
    </Link>
  );
}

ReviewButton.propTypes = {
  filmId: PropTypes.number.isRequired,
};

export default ReviewButton;


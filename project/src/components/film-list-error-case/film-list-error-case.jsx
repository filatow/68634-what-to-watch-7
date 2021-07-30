import React from 'react';
import PropTypes from 'prop-types';
import ErrorMessage from '../error-message/error-message';
import './film-list-error-case.css';

function FilmListErrorCase({errorCode}) {
  return (
    <h3 className="catalog__films-list-error films-list-error">
      <div className="films-list-error__heading">
        Films cannot be presented now. <br />
        Something went wrong...
      </div>
      <ErrorMessage errorCode={errorCode} />
    </h3>);
}

FilmListErrorCase.propTypes = {
  errorCode: PropTypes.number.isRequired,
};

export default FilmListErrorCase;

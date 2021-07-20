import React from 'react';
import PropTypes from 'prop-types';
import {HttpCode} from '../../consts';
import './error-message.css';

function errorMessageText(errorCode) {
  switch (errorCode) {
    case HttpCode.BAD_REQUEST:
      return 'Bad request to server';
    case HttpCode.UNAUTHORIZED:
      return 'Authorization is required';
    default:
      return 'Unknown error';
  }
}

function ErrorMessage({errorCode}) {
  const text = errorMessageText(errorCode);

  return (
    <div className="error-message">
      Error: {text}
    </div>
  );
}

ErrorMessage.propTypes = {
  errorCode: PropTypes.number.isRequired,
};

export default ErrorMessage;


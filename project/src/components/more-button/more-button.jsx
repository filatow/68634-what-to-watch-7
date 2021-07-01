import React from 'react';
import PropTypes from 'prop-types';

function MoreButton({onClick}) {
  return (
    <div className="catalog__more">
      <button
        className="catalog__button"
        type="button"
        onClick={onClick}
      >
        Show more
      </button>
    </div>
  );
}

MoreButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default MoreButton;


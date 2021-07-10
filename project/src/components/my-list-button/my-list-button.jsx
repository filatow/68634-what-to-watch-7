import React from 'react';
import PropTypes from 'prop-types';

function MyListButton({isInList, onClick}) {
  const $icon = isInList
    ? (
      <svg viewBox="0 0 18 14" width="18" height="14">
        <use xlinkHref="#in-list"></use>
      </svg>
    )
    : (
      <svg viewBox="0 0 19 20" width="19" height="20">
        <use xlinkHref="#add"></use>
      </svg>
    );

  return (
    <button
      className="btn btn--list film-card__button"
      type="button"
      onClick={(evt) => {
        evt.preventDefault();
        onClick();
      }}
    >
      {$icon}
      <span>My list</span>
    </button>
  );
}

MyListButton.propTypes = {
  isInList: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
};

export default MyListButton;


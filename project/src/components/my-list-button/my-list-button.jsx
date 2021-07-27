import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import PropTypes from 'prop-types';
import {getIsAuthorized} from '../../store/user/selectors';
import {AppRoute} from '../../consts';
import {redirectToRoute} from '../../store/action';

function MyListButton({isInList, onClick}) {
  const isAuthorized = useSelector(getIsAuthorized);

  const dispatch = useDispatch();

  const $icon = isInList
    ? (
      <svg viewBox="0 0 18 14" width="18" height="14" data-testid="in-list-icon">
        <use xlinkHref="#in-list"></use>
      </svg>
    )
    : (
      <svg viewBox="0 0 19 20" width="19" height="20" data-testid="add-icon">
        <use xlinkHref="#add"></use>
      </svg>
    );

  return (
    <button
      className="btn btn--list film-card__button"
      type="button"
      onClick={(evt) => {
        evt.preventDefault();
        if (!isAuthorized) {
          dispatch(redirectToRoute(AppRoute.LOGIN));
          return;
        }
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


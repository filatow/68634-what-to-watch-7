import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../header/header';
import PlayButton from '../play-button/play-button';
import MyListButton from '../my-list-button/my-list-button';
import {fetchPromotedFilm} from '../../store/api-actions';
import {getPromotedFilm, getPromotedFilmErrorCode} from '../../store/main-page/selectors';
import {isPromotedFilmLoading} from '../../store/loading/selectors';
import Spinner from '../spinner/spinner';
import ErrorMessage from '../error-message/error-message';

function getErrorCaseMarkup(errorCode) {
  return (
    <h2 className="film-card__title">
      <span>
        We were going to represent you an excellent movie here,<br />
        but something went wrong...
      </span>
      <ErrorMessage errorCode={errorCode} />
    </h2>);
}

function PromotedFilmCard({onMyListButtonClick}) {
  const isDataLoading = useSelector(isPromotedFilmLoading);
  const errorCode = useSelector(getPromotedFilmErrorCode);
  const film = useSelector(getPromotedFilm);
  const {
    id,
    isFavorite,
    title,
    genre,
    release,
    backgroundImage,
    poster,
  } = film;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPromotedFilm());
  }, [dispatch]);


  const isFirstLoading = !Object.keys(film).length;
  if (isDataLoading && isFirstLoading) {
    return <Spinner />;
  }

  return (
    <section className="film-card">
      <div className="film-card__bg">
        <img src={backgroundImage} alt={title} />
      </div>

      <h1 className="visually-hidden" data-testid="heading">WTW</h1>

      <Header />
      <div className="film-card__wrap">
        {errorCode
          ? getErrorCaseMarkup(errorCode)
          :
          <div className="film-card__info">
            <div className="film-card__poster">
              <img src={poster} alt={title} width="218" height="327" />
            </div>

            <div className="film-card__desc">
              <h2 className="film-card__title">{title}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{genre}</span>
                <span className="film-card__year">{release}</span>
              </p>

              <div className="film-card__buttons">
                <PlayButton filmId={id} />
                <MyListButton isInList={isFavorite} onClick={onMyListButtonClick}/>
              </div>
            </div>
          </div>}
      </div>
    </section>
  );
}

PromotedFilmCard.propTypes = {
  onMyListButtonClick: PropTypes.func.isRequired,
};

export default PromotedFilmCard;


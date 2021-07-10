import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import filmProp from './film.prop';
import FilmList from '../film-list/film-list';
import FilmTabs from '../film-tabs/film-tabs';
import {Link} from 'react-router-dom';
import {AppRoute, LoadedData, AuthorizationStatus} from '../../consts';
import Spinner from '../spinner/spinner';
import Page404 from '../page-404/page-404';
import { connect } from 'react-redux';
import {
  fetchCurrentFilm,
  fetchSimilarFilms,
  setFilmFavoriteStatus
} from '../../store/api-actions';
import Header from '../header/header';
import MyListButton from '../my-list-button/my-list-button';
import ReviewButton from '../review-button/review-button';
import PlayButton from '../play-button/play-button';

function Film(props) {
  const {
    filmId,
    film,
    similarFilms,
    getFilm,
    isDataLoaded,
    getSimilarFilms,
    isAuthorized,
    toggleFavoriteStatus,
  } = props;

  useEffect(() => {
    getFilm(filmId);
    getSimilarFilms(filmId);
  }, [filmId, getFilm, getSimilarFilms]);

  if (!isDataLoaded) {
    return <Spinner />;
  }

  if (!Object.keys(film).length) {
    return <Page404 />;
  }

  const {
    title,
    backgroundImage,
    release,
    cover,
    genre,
    id,
    isFavorite,
  } = film;

  const onMyListButtonClick = toggleFavoriteStatus.bind(null, id, !isFavorite);

  return (
    <React.Fragment>
      <section className="film-card film-card--full">
        <div className="film-card__hero">
          <div className="film-card__bg">
            <img src={backgroundImage} alt="The Grand Budapest Hotel" />
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <Header />

          <div className="film-card__wrap">
            <div className="film-card__desc">
              <h2 className="film-card__title">{title}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{genre}</span>
                <span className="film-card__year">{release}</span>
              </p>

              <div className="film-card__buttons">
                <PlayButton filmId={id} />
                {isAuthorized
                  ? <MyListButton isInList={isFavorite} onClick={onMyListButtonClick} />
                  : ''}
                {isAuthorized ? <ReviewButton filmId={id} /> : ''}
              </div>
            </div>
          </div>
        </div>

        <div className="film-card__wrap film-card__translate-top">
          <div className="film-card__info">
            <div className="film-card__poster film-card__poster--big">
              <img src={cover} alt={title} width="218" height="327" />
            </div>

            <div className="film-card__desc">
              <FilmTabs film={film} />
            </div>
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>

          <FilmList
            films={similarFilms}
          >
          </FilmList>
        </section>

        <footer className="page-footer">
          <div className="logo">
            <Link to={AppRoute.MAIN} className="logo__link logo__link--light">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </Link>
          </div>

          <div className="copyright">
            <p>© 2019 What to watch Ltd.</p>
          </div>
        </footer>
      </div>

    </React.Fragment>
  );
}

Film.propTypes = {
  filmId: PropTypes.string.isRequired,
  film: PropTypes.oneOfType([
    filmProp,
    PropTypes.shape({}),
  ]),
  getFilm: PropTypes.func.isRequired,
  getSimilarFilms: PropTypes.func.isRequired,
  isDataLoaded: PropTypes.bool.isRequired,
  isAuthorized: PropTypes.bool.isRequired,
  similarFilms: PropTypes.arrayOf(filmProp).isRequired,
  toggleFavoriteStatus: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  film: state.currentFilm,
  similarFilms: state.similarFilms,
  isDataLoaded: !(
    state.isLoading[LoadedData.CURRENT_FILM] || state.isLoading[LoadedData.SIMILAR_FILMS]
  ),
  isAuthorized: state.authorizationStatus === AuthorizationStatus.AUTH,
});

const mapDispatchToProps = (dispatch) => ({
  getFilm(id) {
    dispatch(fetchCurrentFilm(id));
  },
  getSimilarFilms(id) {
    dispatch(fetchSimilarFilms(id));
  },
  toggleFavoriteStatus(filmId, isFavorite) {
    dispatch(setFilmFavoriteStatus(filmId, Number(isFavorite)));
  },
});

export {Film};
export default connect(mapStateToProps, mapDispatchToProps)(Film);


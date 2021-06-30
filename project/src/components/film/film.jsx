import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import filmProp from './film.prop';
import FilmList from '../film-list/film-list';
import FilmTabs from '../film-tabs/film-tabs';
import {Link} from 'react-router-dom';
import {AppRoute, LoadedData, AuthorizationStatus} from '../../consts';
import UserBlock from '../user-block/user-block';
import Spinner from '../spinner/spinner';
import Page404 from '../page-404/page-404';
import { connect } from 'react-redux';
import { fetchCurrentFilm, fetchSimilarFilms } from '../../store/api-actions';

function Film(props) {
  const {
    filmId,
    film,
    similarFilms,
    getFilm,
    isDataLoaded,
    getSimilarFilms,
    isAuthorized,
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
  } = film;

  const addReviewButton = (
    <Link
      to={`${AppRoute.FILMS}/${id}${AppRoute.REVIEW}`}
      className="btn film-card__button"
    >
      Add review
    </Link>
  );

  return (
    <React.Fragment>
      <section className="film-card film-card--full">
        <div className="film-card__hero">
          <div className="film-card__bg">
            <img src={backgroundImage} alt="The Grand Budapest Hotel" />
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <header className="page-header film-card__head">
            <div className="logo">
              <Link to={AppRoute.MAIN} className="logo__link">
                <span className="logo__letter logo__letter--1">W</span>
                <span className="logo__letter logo__letter--2">T</span>
                <span className="logo__letter logo__letter--3">W</span>
              </Link>
            </div>

            <UserBlock />
          </header>

          <div className="film-card__wrap">
            <div className="film-card__desc">
              <h2 className="film-card__title">{title}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{genre}</span>
                <span className="film-card__year">{release}</span>
              </p>

              <div className="film-card__buttons">
                <button className="btn btn--play film-card__button" type="button">
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </button>
                <button className="btn btn--list film-card__button" type="button">
                  <svg viewBox="0 0 19 20" width="19" height="20">
                    <use xlinkHref="#add"></use>
                  </svg>
                  <span>My list</span>
                </button>

                {isAuthorized ? addReviewButton : ''}
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
});

export {Film};
export default connect(mapStateToProps, mapDispatchToProps)(Film);


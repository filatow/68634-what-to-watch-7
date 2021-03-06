import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import FilmList from '../film-list/film-list';
import FilmTabs from '../film-tabs/film-tabs';
import Spinner from '../spinner/spinner';
import Page404 from '../page-404/page-404';
import {useSelector, useDispatch} from 'react-redux';
import {
  fetchCurrentFilm,
  fetchSimilarFilms,
  setFilmFavoriteStatus
} from '../../store/api-actions';
import Header from '../header/header';
import MyListButton from '../my-list-button/my-list-button';
import ReviewButton from '../review-button/review-button';
import PlayButton from '../play-button/play-button';
import {
  getCurrentFilm,
  getSimilarFilms,
  getSimilarFilmsErrorCode
} from '../../store/film-page/selectors';
import {isFilmPageDataLoading} from '../../store/loading/selectors';
import FilmListErrorCase from '../film-list-error-case/film-list-error-case';
import Footer from '../footer/footer';

function Film({filmId}) {
  const film = useSelector(getCurrentFilm);
  const similarFilms = useSelector(getSimilarFilms).filter((sim) => sim.id !== film.id);
  const similarFilmsErrorCode = useSelector(getSimilarFilmsErrorCode);
  const isDataLoading = useSelector(isFilmPageDataLoading);

  const dispatch = useDispatch();

  const toggleFavoriteStatus = (currentFilmId, favoriteStatus) => {
    dispatch(setFilmFavoriteStatus(currentFilmId, Number(favoriteStatus)));
  };

  useEffect(() => {
    dispatch(fetchCurrentFilm(filmId));
    dispatch(fetchSimilarFilms(filmId));
  }, [filmId, dispatch]);

  if (!Object.keys(film).length) {
    if (isDataLoading) {
      return <Spinner />;
    }

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
                <MyListButton isInList={isFavorite} onClick={onMyListButtonClick} />
                <ReviewButton filmId={id} />
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

          {similarFilmsErrorCode ? <FilmListErrorCase errorCode={similarFilmsErrorCode} />
            :<FilmList films={similarFilms} isLoading={isDataLoading} />}

        </section>

        <Footer />
      </div>

    </React.Fragment>
  );
}

Film.propTypes = {
  filmId: PropTypes.string.isRequired,
};
export default Film;

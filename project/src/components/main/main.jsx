import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {AppRoute} from '../../consts';
import filmProp from '../film/film.prop';
import FilmList from '../film-list/film-list';
import GenreList from '../genre-list/genre-list';
import MoreButton from '../more-button/more-button';
import Spinner from '../spinner/spinner';
import {
  fetchFilmList,
  fetchPromotedFilm,
  setPromotedFilmFavoriteStatus
} from '../../store/api-actions';
import Header from '../header/header';
import MyListButton from '../my-list-button/my-list-button';
import PlayButton from '../play-button/play-button';
import {
  getFilteredFilms,
  getPromotedFilm as getPromoFilm
} from '../../store/main-page/selectors';
import { isMainPageDataLoading } from '../../store/loading/selectors';

const BUNCH_FILM_COUNT = 8;

function Main(props) {
  const {
    getFilms,
    getPromotedFilm,
    filteredFilms,
    promotedFilm,
    isDataLoading,
    togglePromotedFilmFavoriteStatus,
  } = props;
  const {
    id,
    isFavorite,
    title,
    genre,
    release,
    backgroundImage,
    poster,
  } = promotedFilm;


  useEffect(() => {
    getFilms();
    getPromotedFilm();
  }, [getFilms, getPromotedFilm]);

  const [filmsMustBeShown, setFilmsMustBeShown] = useState([]);
  const [filmsMustBeShownCount, setFilmsMustBeShownCount] = useState(BUNCH_FILM_COUNT);
  const [isMoreButtonVisible, setIsMoreButtonVisible] = useState(true);

  useEffect(() => {
    setFilmsMustBeShown(filteredFilms.slice(0, filmsMustBeShownCount));
    if (filteredFilms.length <= filmsMustBeShownCount) {
      setIsMoreButtonVisible(false);
    } else {
      setIsMoreButtonVisible(true);
    }
  }, [filteredFilms, filmsMustBeShownCount]);

  if (isDataLoading) {
    return <Spinner />;
  }

  const onMoreButtonClick = () => {
    setFilmsMustBeShownCount(
      (prev) => (prev + BUNCH_FILM_COUNT) > filteredFilms.length
        ? filteredFilms.length
        : (prev + BUNCH_FILM_COUNT),
    );
  };

  const onMyListButtonClick = togglePromotedFilmFavoriteStatus.bind(null, id, !isFavorite);

  return (
    <React.Fragment>
      <section className="film-card">
        <div className="film-card__bg">
          <img src={backgroundImage} alt="The Grand Budapest Hotel" />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <Header />

        <div className="film-card__wrap">
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
                <MyListButton
                  isInList={isFavorite}
                  onClick={onMyListButtonClick}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>

          <GenreList />

          <FilmList films={filmsMustBeShown} />

          {isMoreButtonVisible ? <MoreButton onClick={onMoreButtonClick} /> : ''}

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

Main.propTypes = {
  getFilms: PropTypes.func.isRequired,
  getPromotedFilm: PropTypes.func.isRequired,
  filteredFilms: PropTypes.arrayOf(filmProp).isRequired,
  promotedFilm: PropTypes.oneOfType([
    filmProp,
    PropTypes.shape({}),
  ]).isRequired,
  isDataLoading: PropTypes.bool.isRequired,
  togglePromotedFilmFavoriteStatus: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  filteredFilms: getFilteredFilms(state),
  promotedFilm: getPromoFilm(state),
  isDataLoading: isMainPageDataLoading(state),
});

const mapDispatchToProps = (dispatch) => ({
  getFilms() {
    dispatch(fetchFilmList());
  },
  getPromotedFilm() {
    dispatch(fetchPromotedFilm());
  },
  togglePromotedFilmFavoriteStatus(filmId, isFavorite) {
    dispatch(setPromotedFilmFavoriteStatus(filmId, Number(isFavorite)));
  },
});

export {Main};
export default connect(mapStateToProps, mapDispatchToProps)(Main);

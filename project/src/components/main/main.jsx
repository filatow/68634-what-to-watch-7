import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {AppRoute} from '../../consts';
import filmProp from '../film/film.prop';
import FilmList from '../film-list/film-list';
import GenreList from '../genre-list/genre-list';
import UserBlock from '../user-block/user-block';
import MoreButton from '../more-button/more-button';

const BUNCH_FILM_COUNT = 8;

function Main(props) {
  const {filteredFilms, promotedFilm} = props;
  const {title, genre, release, backgroundImage, poster} = promotedFilm;


  const [filmsMustBeShown, setFilmsMustBeShown] = useState([]);
  const [filmsMustBeShownCount, setFilmsMustBeShownCount] = useState(BUNCH_FILM_COUNT);
  const [isMoreButtonVisible, setIsMoreButtonVisible] =
    useState(filteredFilms.length > BUNCH_FILM_COUNT);

  useEffect(() => {
    setFilmsMustBeShown(filteredFilms.slice(0, filmsMustBeShownCount));
    if (filteredFilms.length === filmsMustBeShownCount) {
      setIsMoreButtonVisible(false);
    }
  }, [filteredFilms, filmsMustBeShownCount]);

  const onMoreButtonClick = () => {
    setFilmsMustBeShownCount(
      (prev) => (prev + BUNCH_FILM_COUNT) > filteredFilms.length
        ? filteredFilms.length
        : (prev + BUNCH_FILM_COUNT),
    );
  };

  return (
    <React.Fragment>
      <section className="film-card">
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
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>

          <GenreList/>

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
  filteredFilms: PropTypes.arrayOf(filmProp).isRequired,
  promotedFilm: filmProp,
};

const mapStateToProps = (state) => ({
  filteredFilms: state.filteredFilms,
});

export {Main};
export default connect(mapStateToProps, null)(Main);

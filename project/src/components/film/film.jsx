import React from 'react';
import PropTypes from 'prop-types';
import filmProp from './film.prop';
import FilmList from '../film-list/film-list';
import {Link} from 'react-router-dom';
import {AppRoute} from '../../consts';
import Page404 from '../page-404/page-404';

const determineGrage = function(numericRating) {
  if (numericRating === 10) {
    return 'Awesome';
  } else if (numericRating >= 8) {
    return 'Very good';
  } else if (numericRating >= 5) {
    return 'Good';
  } else if (numericRating >= 3) {
    return 'Normal';
  } else {
    return 'Bad';
  }
};
function Film({film, similarFilms}) {
  if (!film) {
    return <Page404></Page404>;
  }

  const {
    title,
    backgroundImage,
    description,
    release,
    rating,
    voteCount,
    director,
    starring,
    cover,
    genre,
    id,
  } = film;

  const filmStarring = starring.join(', ');
  const voteGrade = determineGrage(rating);

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

            <ul className="user-block">
              <li className="user-block__item">
                <div className="user-block__avatar">
                  <img src="img/avatar.jpg" alt="User avatar" width="63" height="63" />
                </div>
              </li>
              <li className="user-block__item">
                <Link to={AppRoute.LOGIN} className="user-block__link">Sign out</Link>
              </li>
            </ul>
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
                <Link to={`${AppRoute.FILMS}/${id}${AppRoute.REVIEW}`} className="btn film-card__button">Add review</Link>
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
              <nav className="film-nav film-card__nav">
                <ul className="film-nav__list">
                  <li className="film-nav__item film-nav__item--active">
                    <a href="/" className="film-nav__link">Overview</a>
                  </li>
                  <li className="film-nav__item">
                    <a href="/" className="film-nav__link">Details</a>
                  </li>
                  <li className="film-nav__item">
                    <a href="/" className="film-nav__link">Reviews</a>
                  </li>
                </ul>
              </nav>

              <div className="film-rating">
                <div className="film-rating__score">{rating}</div>
                <p className="film-rating__meta">
                  <span className="film-rating__level">{voteGrade}</span>
                  <span className="film-rating__count">{voteCount} ratings</span>
                </p>
              </div>

              <div className="film-card__text">
                {description}

                <p className="film-card__director"><strong>Director: {director}</strong></p>

                <p className="film-card__starring"><strong>Starring: {filmStarring} and other</strong></p>
              </div>
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
  film: filmProp,
  similarFilms: PropTypes.arrayOf(filmProp).isRequired,
};

export default Film;


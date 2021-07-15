import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import filmProp from '../film/film.prop';
import {Link} from 'react-router-dom';
import {AppRoute, LoadedData} from '../../consts';
import ReviewForm from '../review-form/review-form';
import UserBlock from '../user-block/user-block';
import { connect } from 'react-redux';
import {fetchCurrentFilm} from '../../store/api-actions';
import Page404 from '../page-404/page-404';
import Spinner from '../spinner/spinner';

function AddReview({filmId, currentFilm, getFilm, isDataLoaded}) {

  useEffect(() => {
    if (currentFilm.id !== parseInt(filmId, 10)) {
      getFilm(filmId);
    }
  }, [filmId, currentFilm, getFilm]);

  if (!isDataLoaded) {
    return <Spinner />;
  }

  if (!Object.keys(currentFilm).length) {
    return <Page404 />;
  }

  const {
    title,
    backgroundImage,
    poster,
    id,
  } = currentFilm;

  return (
    <section className="film-card film-card--full">
      <div className="film-card__header">
        <div className="film-card__bg">
          <img src={backgroundImage} alt="The Grand Budapest Hotel" />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header">
          <div className="logo">
            <Link to={AppRoute.MAIN} className="logo__link">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </Link>
          </div>

          <nav className="breadcrumbs">
            <ul className="breadcrumbs__list">
              <li className="breadcrumbs__item">
                <Link to={`${AppRoute.FILMS}/${id}`} className="breadcrumbs__link">{title}</Link>
              </li>
              <li className="breadcrumbs__item">
                <span className="breadcrumbs__link">Add review</span>
              </li>
            </ul>
          </nav>

          <UserBlock />

        </header>

        <div className="film-card__poster film-card__poster--small">
          <img
            src={poster}
            alt={title}
            width="218"
            height="327"
          />
        </div>
      </div>

      <div className="add-review">
        <ReviewForm filmId={id} />
      </div>

    </section>
  );
}

AddReview.propTypes = {
  filmId: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  currentFilm: PropTypes.oneOfType([
    filmProp,
    PropTypes.shape({}),
  ]).isRequired,
  isDataLoaded: PropTypes.bool.isRequired,
  getFilm: PropTypes.func.isRequired,
};

const mapStateToProps = ({FILM, LOADING}) => ({
  currentFilm: FILM.currentFilm,
  isDataLoaded: !LOADING.isLoading[LoadedData.CURRENT_FILM],
});

const mapDispatchToProps = (dispatch) => ({
  getFilm(id) {
    dispatch(fetchCurrentFilm(id));
  },
});


export {AddReview};
export default connect(mapStateToProps, mapDispatchToProps)(AddReview);

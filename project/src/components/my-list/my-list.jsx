import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import filmProp from '../film/film.prop';
import FilmList from '../film-list/film-list';
import Header from '../header/header';
import Spinner from '../spinner/spinner';
import {Link} from 'react-router-dom';
import {AppRoute} from '../../consts';
import {connect} from 'react-redux';
import {fetchFavoriteFilms} from '../../store/api-actions';
import { getFavoriteFilms as getFavorites } from '../../store/favorite-page/selectors';
import { isFavoriteFilmsLoading } from '../../store/loading/selectors';

function MyList({favoriteFilms, isDataLoading, getFavoriteFilms}) {

  useEffect(() => {
    getFavoriteFilms();
  }, [getFavoriteFilms]);

  if (isDataLoading) {
    return <Spinner />;
  }

  return (
    <div className="user-page">
      <Header>
        <h1 className="page-title user-page__title">My list</h1>
      </Header>

      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>

        <FilmList films={favoriteFilms}></FilmList>
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
  );
}

MyList.propTypes = {
  favoriteFilms: PropTypes.oneOfType([
    filmProp,
    PropTypes.array,
  ]).isRequired,
  isDataLoading: PropTypes.bool.isRequired,
  getFavoriteFilms: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  favoriteFilms: getFavorites(state),
  isDataLoading: isFavoriteFilmsLoading(state),
});

const mapDispatchToProps = (dispatch) => ({
  getFavoriteFilms() {
    dispatch(fetchFavoriteFilms());
  },
});

export {MyList};
export default connect(mapStateToProps, mapDispatchToProps)(MyList);

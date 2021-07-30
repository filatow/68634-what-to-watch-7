import React, {useEffect} from 'react';
import FilmList from '../film-list/film-list';
import Header from '../header/header';
import {useSelector, useDispatch} from 'react-redux';
import {fetchFavoriteFilms} from '../../store/api-actions';
import {getFavoriteFilms, getFavoriteFilmsErrorCode} from '../../store/favorite-page/selectors';
import {isFavoriteFilmsLoading} from '../../store/loading/selectors';
import FilmListErrorCase from '../film-list-error-case/film-list-error-case';
import Footer from '../footer/footer';

function MyList() {
  const favoriteFilms = useSelector(getFavoriteFilms);
  const isDataLoading = useSelector(isFavoriteFilmsLoading);
  const favoriteFilmsErrorCode = useSelector(getFavoriteFilmsErrorCode);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFavoriteFilms());
  }, [dispatch]);

  return (
    <div className="user-page">
      <Header>
        <h1 className="page-title user-page__title">My list</h1>
      </Header>

      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>

        {favoriteFilmsErrorCode ? <FilmListErrorCase errorCode={favoriteFilmsErrorCode} />
          : <FilmList films={favoriteFilms} isLoading={isDataLoading}/>}
      </section>

      <Footer />
    </div>
  );
}

export default MyList;

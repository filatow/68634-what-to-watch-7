import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import FilmList from '../film-list/film-list';
import GenreList from '../genre-list/genre-list';
import MoreButton from '../more-button/more-button';
import Spinner from '../spinner/spinner';
import {
  fetchFilmList,
  fetchPromotedFilm,
  setPromotedFilmFavoriteStatus
} from '../../store/api-actions';
import {
  getFilmsErrorCode,
  getFilteredFilms,
  getPromotedFilm as getPromoFilm
} from '../../store/main-page/selectors';
import {isFilmsLoading} from '../../store/loading/selectors';
import PromotedFilmCard from '../promoted-film-card/promoted-film-card';
import FilmListErrorCase from '../film-list-error-case/film-list-error-case';
import Footer from '../footer/footer';

const BUNCH_FILM_COUNT = 8;

function Main() {
  const filteredFilms = useSelector(getFilteredFilms);
  const promotedFilm = useSelector(getPromoFilm);
  const filmsErrorCode = useSelector(getFilmsErrorCode);
  const isDataLoading = useSelector(isFilmsLoading);

  const {
    id,
    isFavorite,
  } = promotedFilm;

  const dispatch = useDispatch();

  const togglePromotedFilmFavoriteStatus = (promotedFilmId, favoriteStatus) => {
    dispatch(setPromotedFilmFavoriteStatus(promotedFilmId, Number(favoriteStatus)));
  };

  useEffect(() => {
    dispatch(fetchFilmList());
    dispatch(fetchPromotedFilm());
  }, [dispatch]);

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

  useEffect(() => {
    if (isDataLoading) {
      return <Spinner />;
    }
  }, [isDataLoading]);

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
      <PromotedFilmCard onMyListButtonClick={onMyListButtonClick} />
      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>

          <GenreList />

          {filmsErrorCode ? <FilmListErrorCase errorCode={filmsErrorCode} />
            : <FilmList films={filmsMustBeShown} isLoading={isDataLoading} />}


          {isMoreButtonVisible ? <MoreButton onClick={onMoreButtonClick} /> : ''}

        </section>

        <Footer />
      </div>
    </React.Fragment>
  );
}

export default Main;

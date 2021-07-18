import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {FilmCategory} from './../../consts';
import {setFilterCategory} from '../../store/action';
import { getFilms, getFilterCategory } from '../../store/main-page/selectors';

const MAX_GENRES_COUNT = 10;

function GenreList() {
  const films = useSelector(getFilms);
  const filterCategory = useSelector(getFilterCategory);

  const dispatch = useDispatch();

  const categories = [FilmCategory.ALL_GENRES, ...new Set(films.map((film) => film.genre))];

  const $categories = categories.slice(0, MAX_GENRES_COUNT).map((caterogy) => {
    const activeClass = filterCategory === caterogy ? 'catalog__genres-item--active' : '';
    return (
      <li className={`catalog__genres-item ${activeClass}`} key={caterogy}>
        <a
          href="#/"
          className="catalog__genres-link"
          onClick={(evt) => {
            evt.preventDefault();
            dispatch(setFilterCategory(caterogy));
          }}
        >
          {caterogy}
        </a>
      </li>);
  });

  return (
    <ul className="catalog__genres-list">
      {$categories}
    </ul>
  );
}

export default GenreList;

import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {setFilterCategory} from '../../store/action';
import {getAllCategories, getFilterCategory} from '../../store/main-page/selectors';

const MAX_GENRES_TO_SHOW = 10;

function GenreList() {
  const filterCategory = useSelector(getFilterCategory);
  const categories = useSelector(getAllCategories);

  const dispatch = useDispatch();


  const $categories = categories.slice(0, MAX_GENRES_TO_SHOW).map((caterogy) => {
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

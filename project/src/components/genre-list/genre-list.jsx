import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import filmProp from '../film/film.prop';
import {FilmCategory} from './../../consts';
import {ActionCreator} from '../../store/action';

function GenreList({films, filterCategory, onChangeCategory}) {
  const categories = [FilmCategory.ALL_GENRES, ...new Set(films.map((film) => film.genre))];

  const $categories = categories.map((caterogy) => {
    const activeClass = filterCategory === caterogy ? 'catalog__genres-item--active' : '';
    return (
      <li className={`catalog__genres-item ${activeClass}`} key={caterogy}>
        <a
          href="#/"
          className="catalog__genres-link"
          onClick={(evt) => {
            evt.preventDefault();
            onChangeCategory(caterogy);
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

GenreList.propTypes = {
  filterCategory: PropTypes.string.isRequired,
  films: PropTypes.arrayOf(filmProp).isRequired,
  onChangeCategory: PropTypes.func.isRequired,
};


const mapStateToProps = (state) => ({
  filterCategory: state.filterCategory,
  films: state.films,
});

const mapDispatchToProps = (dispatch) => ({
  onChangeCategory(FilterCategory) {
    dispatch(ActionCreator.setFilterCategory(FilterCategory));
  },
});


export {GenreList};
export default connect(mapStateToProps, mapDispatchToProps)(GenreList);

import React, {useState} from 'react';
import PropTypes from 'prop-types';
import filmProp from '../film/film.prop';
import SmallFilmCard from '../small-film-card/small-film-card';

function FilmList({films}) {
  const [activeFilmCard, setActiveFilmCard] = useState({});

  return (
    <div className="catalog__films-list">
      {films.map((film) => (
        <SmallFilmCard
          film={film}
          key={film.id}
          hoverHandler={setActiveFilmCard}
          isActive={activeFilmCard?.id === film.id}
        />
      ))}
    </div>
  );
}

FilmList.propTypes = {
  films: PropTypes.arrayOf(filmProp).isRequired,
};

export default FilmList;

import React, {useState} from 'react';
import PropTypes from 'prop-types';
import filmProp from '../film/film.prop';
import SmallFilmCard from '../small-film-card/small-film-card';

function FilmList({films}) {
  const [activeFilmCard, setActiveFilmCard] = useState({});

  const $films = films.length && films.map((film) => (
    <SmallFilmCard
      film={film}
      key={film.id}
      onHover={setActiveFilmCard}
      isActive={activeFilmCard?.id === film.id}
    />
  ));
  const noFilmsMessage = '...unfortunately, there is no any film in database yet';

  return (
    <div className="catalog__films-list">
      {$films || noFilmsMessage}
    </div>
  );
}

FilmList.propTypes = {
  films: PropTypes.arrayOf(filmProp).isRequired,
};

export default FilmList;

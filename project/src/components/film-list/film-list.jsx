import React, {useState} from 'react';
import PropTypes from 'prop-types';
import filmProp from '../film/film.prop';
import SmallFilmCard from '../small-film-card/small-film-card';

function FilmList({films}) {
  // const [activeFilmCard, setactiveFilmCard] = useState({});
  const setactiveFilmCard = useState({})[1];


  return (
    <div className="catalog__films-list">
      {films.map((film) => (
        <SmallFilmCard
          film={film}
          key={film.id}
          hoverHandler={setactiveFilmCard}
        />
      ))}
    </div>
  );
}

FilmList.propTypes = {
  films: PropTypes.arrayOf(filmProp).isRequired,
};

export default FilmList;

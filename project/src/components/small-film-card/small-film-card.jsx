import React from 'react';
import filmProp from '../film/film.prop';
import PropTypes from 'prop-types';


function SmallFilmCard({film, hoverHandler}) {
  const {title, cover} = film;


  return (
    <article
      className="small-film-card catalog__films-card"
      onMouseEnter={() => {hoverHandler(film);}}
      onMouseLeave={() => {hoverHandler({});}}
    >
      <div className="small-film-card__image">
        <img src={cover} alt="Fantastic Beasts: The Crimes of Grindelwald" width="280" height="175" />
      </div>
      <h3 className="small-film-card__title">
        <a className="small-film-card__link" href="film-page.html">{title}</a>
      </h3>
    </article>
  );
}

SmallFilmCard.propTypes = {
  film: filmProp,
  hoverHandler: PropTypes.func.isRequired,
};
export default SmallFilmCard;

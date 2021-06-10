import React from 'react';
import filmProp from '../film/film.prop';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {AppRoute} from '../../consts';


function SmallFilmCard({film, hoverHandler}) {
  const {id, title, cover} = film;


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
        <Link className="small-film-card__link" to={`${AppRoute.FILMS}/${id}`}>{title}</Link>
      </h3>
    </article>
  );
}

SmallFilmCard.propTypes = {
  film: filmProp,
  hoverHandler: PropTypes.func.isRequired,
};
export default SmallFilmCard;

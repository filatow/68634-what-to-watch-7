import React from 'react';
import {render, screen} from '@testing-library/react';
import OverviewTab from './overview-tab';
import {determineRatingGrage} from '../../utils';

describe('Component: OverviewTab', () => {
  it('should render correctly', () => {
    const FILM_DESCRIPTION = 'Long text';
    const FILM_RATING = 10;
    const FILM_VOTE_COUNT = 33888;
    const FILM_DIRECTOR = 'Famous Name';
    const FILM_STARRING = ['Star 1', 'Star 2', 'Star 3'];

    const mockFilm = {
      id: 1,
      director: FILM_DIRECTOR,
      starring: FILM_STARRING,
      duration: 99,
      genre: 'Comedy',
      release: 2010,
      poster: '/img/poster.jpg',
      cover: '/img/cover.jpg',
      backgroundImage: '/img/bg.jpg',
      backgroundColor: '#ffffff',
      video: 'video/movie.webm',
      previewVideo: 'video/preview.webm',
      title: 'Title',
      description: FILM_DESCRIPTION,
      voteCount: FILM_VOTE_COUNT,
      rating: FILM_RATING,
    };
    const voteGrade = determineRatingGrage(FILM_RATING);
    const filmStarring = FILM_STARRING.join(', ');

    render(
      <OverviewTab film={mockFilm}/>,
    );

    expect(screen.getByText(`${FILM_RATING}`)).toBeInTheDocument();
    expect(screen.getByText(voteGrade)).toBeInTheDocument();
    expect(screen.getByText(`${FILM_VOTE_COUNT} ratings`)).toBeInTheDocument();
    expect(screen.getByText(`Director: ${FILM_DIRECTOR}`)).toBeInTheDocument();
    expect(screen.getByText(`Starring: ${filmStarring} and other`)).toBeInTheDocument();
  });
});

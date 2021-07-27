import React from 'react';
import {render, screen} from '@testing-library/react';
import DetailsTab from './details-tab';
import {getFormatedFilmDuration} from '../../utils';


describe('Component: DetailsTab', () => {
  it('should render correctly', () => {
    const FILM_DIRECTOR = 'Famous Name';
    const FILM_STARRING = ['Star 1', 'Star 2', 'Star 3'];
    const FILM_DURATION = 99;
    const FILM_GENRE = 'Comedy';
    const FILM_RELEASE = 2010;

    const mockFilm = {
      id: 1,
      director: FILM_DIRECTOR,
      starring: FILM_STARRING,
      duration: FILM_DURATION,
      genre: FILM_GENRE,
      release: FILM_RELEASE,
      poster: '/img/poster.jpg',
      cover: '/img/cover.jpg',
      backgroundImage: '/img/bg.jpg',
      backgroundColor: '#ffffff',
      video: 'video/movie.webm',
      previewVideo: 'video/preview.webm',
      title: 'Title',
      description: 'Long text',
      voteCount: 33888,
      rating: 10,
    };

    render(
      <DetailsTab film={mockFilm}/>,
    );

    expect(screen.getByText(/Director/i)).toBeInTheDocument();
    expect(screen.getByText(FILM_DIRECTOR)).toBeInTheDocument();

    expect(screen.getByText(/Starring/i)).toBeInTheDocument();
    FILM_STARRING.forEach((star) => {
      expect(screen.getByTestId('film-starring')).toHaveTextContent(star);
    });

    expect(screen.getByText(/Run Time/i)).toBeInTheDocument();
    expect(screen.getByTestId('film-duration'))
      .toHaveTextContent(getFormatedFilmDuration(FILM_DURATION));

    expect(screen.getByText(/Genre/i)).toBeInTheDocument();
    expect(screen.getByText(FILM_GENRE)).toBeInTheDocument();

    expect(screen.getByText(/Released/i)).toBeInTheDocument();
    expect(screen.getByText(FILM_RELEASE)).toBeInTheDocument();
  });
});

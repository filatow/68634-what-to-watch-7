import React from 'react';
import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import {AuthorizationStatus, AppRoute, LoadedData} from '../../consts';
import App from './app';
import {getLoadingObject} from '../../utils';

let history = null;
let store = null;
let fakeApp = null;

describe('Application Routing', () => {
  beforeAll(() => {
    history = createMemoryHistory();

    const createFakeStore = configureStore({});
    store = createFakeStore({
      MAIN: {
        promotedFilm: {
          id: 1,
          director: 'famous director',
          starring: ['Star-1', 'Star-2', 'Star-3'],
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
          description: 'Long text',
          voteCount: 33888,
          rating: 8.9,
        },
        films: [
          {
            id: 1,
            director: 'Famous director',
            starring: ['Star-1', 'Star-2', 'Star-3'],
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
            description: 'Long text',
            voteCount: 33888,
            rating: 8.9,
          },
          {
            id: 2,
            director: 'Another director',
            starring: ['Star-1', 'Star-2', 'Star-3'],
            duration: 104,
            genre: 'Horror',
            release: 2010,
            poster: '/img/poster.jpg',
            cover: '/img/cover.jpg',
            backgroundImage: '/img/bg.jpg',
            backgroundColor: '#ffffff',
            video: 'video/movie.webm',
            previewVideo: 'video/preview.webm',
            title: 'Title',
            description: 'Long text',
            voteCount: 12789,
            rating: 5.9,
          },
        ],
      },
      USER: {authorizationStatus: AuthorizationStatus.AUTH},
      FAVORITE: {},
      FILM: {},
      LOADING: {
        isLoading: getLoadingObject(LoadedData),
      },
    });

    fakeApp = (
      <Provider store={store}>
        <Router history={history}>
          <App />
        </Router>
      </Provider>
    );
  });

  it('should render "Main" when user navigate to "/"', () => {
    history.push(AppRoute.MAIN);
    render(fakeApp);

    expect(screen.getByTestId('heading')).toHaveTextContent('WTW');
    expect(screen.getByText(/Catalog/i)).toBeInTheDocument();
  });

});


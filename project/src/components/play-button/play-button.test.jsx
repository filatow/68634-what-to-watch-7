import React from 'react';
import {render} from '@testing-library/react';
import PlayButton from './play-button';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';

describe('Component: MyListButton', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();

    const {getByText} = render(
      <Router history={history}>
        <PlayButton filmId={1}/>,
      </Router>,
    );

    expect(getByText(/Play/i)).toBeInTheDocument();
  });
});

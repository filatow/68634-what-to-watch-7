import React from 'react';
import {render} from '@testing-library/react';
import ReviewButton from './review-button';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';

describe('Component: ReviewButton', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();

    const {getByText} = render(
      <Router history={history}>
        <ReviewButton filmId={1}/>,
      </Router>,
    );

    expect(getByText(/Add review/i)).toBeInTheDocument();
  });
});

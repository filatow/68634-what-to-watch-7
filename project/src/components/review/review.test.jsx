import React from 'react';
import {render, screen} from '@testing-library/react';
import Review from './review';
import {getFormatedReviewDate} from '../../utils';

describe('Component: Review', () => {
  it('should render correctly', () => {
    const USER_NAME = 'User name';
    const COMMENT = 'Some comment text';
    const RATING = 8;
    const DATE = '2019-05-08T14:13:56.569Z';
    const mockReview = {
      id: 1,
      user: {
        id: 1,
        name: USER_NAME,
      },
      rating: RATING,
      comment: COMMENT,
      date: DATE,
    };
    const reviewDate = getFormatedReviewDate(DATE);

    render(
      <Review review={mockReview} />,
    );

    expect(screen.getByText(COMMENT)).toBeInTheDocument();
    expect(screen.getByText(USER_NAME)).toBeInTheDocument();
    expect(screen.getByText(reviewDate)).toBeInTheDocument();
    expect(screen.getByText(`${RATING}`)).toBeInTheDocument();
  });
});

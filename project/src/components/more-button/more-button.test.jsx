import React from 'react';
import {render} from '@testing-library/react';
import MoreButton from './more-button';

describe('Component: MoreButton', () => {
  it('should render correctly', () => {
    const mockOnClick = () => {};
    const {getByText} = render(
      <MoreButton onClick={mockOnClick}/>,
    );

    expect(getByText(/Show more/i)).toBeInTheDocument();
  });
});

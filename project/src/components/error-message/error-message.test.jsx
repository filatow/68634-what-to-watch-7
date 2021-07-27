import React from 'react';
import {render} from '@testing-library/react';
import {HttpCode} from '../../consts';
import ErrorMessage from './error-message';

describe('Component: ErrorMessage', () => {
  it('should render correctly with prop errorCode=400', () => {
    const {getByText} = render(
      <ErrorMessage errorCode={HttpCode.BAD_REQUEST} />,
    );
    expect(getByText(/Error: Bad request to server/i)).toBeInTheDocument();
  });

  it('should render correctly with prop errorCode=401', () => {
    const {getByText} = render(
      <ErrorMessage errorCode={HttpCode.UNAUTHORIZED} />,
    );
    expect(getByText(/Error: Authorization is required/i)).toBeInTheDocument();
  });

  it('should render correctly with prop unknown errorCode', () => {
    const {getByText} = render(
      <ErrorMessage errorCode={-1} />,
    );
    expect(getByText(/Error: Unknown error/i)).toBeInTheDocument();
  });
});

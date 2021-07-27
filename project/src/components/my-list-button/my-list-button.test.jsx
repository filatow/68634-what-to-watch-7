import React from 'react';
import {render} from '@testing-library/react';
import MyListButton from './my-list-button';

describe('Component: MyListButton', () => {
  it('should render correctly with isInList=true', () => {
    const mockOnClick = () => {};
    const testIsInList = true;
    const {getByText, getByTestId} = render(
      <MyListButton isInList={testIsInList} onClick={mockOnClick}/>,
    );

    expect(getByText(/My list/i)).toBeInTheDocument();
    expect(getByTestId('in-list-icon')).toBeInTheDocument();
  });

  it('should render correctly with isInList=false', () => {
    const mockOnClick = () => {};
    const testIsInList = false;
    const {getByText, getByTestId} = render(
      <MyListButton isInList={testIsInList} onClick={mockOnClick}/>,
    );

    expect(getByText(/My list/i)).toBeInTheDocument();
    expect(getByTestId('add-icon')).toBeInTheDocument();
  });
});

import React from 'react';
import {render} from '@testing-library/react';
import MyListButton from './my-list-button';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import { AuthorizationStatus } from '../../consts';

describe('Component: MyListButton', () => {
  it('should render correctly with isInList=true', () => {
    const history = createMemoryHistory();
    const createFakeStore = configureStore({});
    const store = createFakeStore({
      USER: {authorizationStatus: AuthorizationStatus.AUTH},
    });
    const mockOnClick = () => {};
    const testIsInList = true;
    const {getByText, getByTestId} = render(
      <Provider store={store}>
        <Router history={history}>
          <MyListButton isInList={testIsInList} onClick={mockOnClick}/>,
        </Router>,
      </Provider>,
    );

    expect(getByText(/My list/i)).toBeInTheDocument();
    expect(getByTestId('in-list-icon')).toBeInTheDocument();
  });

  it('should render correctly with isInList=false', () => {
    const history = createMemoryHistory();
    const createFakeStore = configureStore({});
    const store = createFakeStore({
      USER: {authorizationStatus: AuthorizationStatus.AUTH},
    });
    const mockOnClick = () => {};
    const testIsInList = false;
    const {getByText, getByTestId} = render(
      <Provider store={store}>
        <Router history={history}>
          <MyListButton isInList={testIsInList} onClick={mockOnClick}/>,
        </Router>,
      </Provider>,
    );

    expect(getByText(/My list/i)).toBeInTheDocument();
    expect(getByTestId('add-icon')).toBeInTheDocument();
  });
});

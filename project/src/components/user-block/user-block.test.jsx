import React from 'react';
import {render} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';
import UserBlock from './user-block';
import {AuthorizationStatus} from '../../consts';

const mockStore = configureStore({});

describe('Component: UserBlock', () => {
  it.skip('should render correctly for authorized user', () => {
    const history = createMemoryHistory();
    const initialState = {
      USER: {
        authorizationStatus: AuthorizationStatus.AUTH,
      },
    };

    const {getByText} = render(
      <Provider store={mockStore(initialState)}>
        <Router history={history}>
          <UserBlock />,
        </Router>
      </Provider>,
    );

    expect(getByText(/Sign out/i)).toBeInTheDocument();
  });

  it.skip('should render correctly for unauthorized user', () => {
    const history = createMemoryHistory();
    const initialState = {
      USER: {
        authorizationStatus: AuthorizationStatus.NO_AUTH,
      },
    };

    const {getByText} = render(
      <Provider store={mockStore(initialState)}>
        <Router history={history}>
          <UserBlock />,
        </Router>
      </Provider>,
    );

    expect(getByText(/Log in/i)).toBeInTheDocument();
  });
});

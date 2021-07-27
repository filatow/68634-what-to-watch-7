import React from 'react';
import {render} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';
import Header from './header';
import {AuthorizationStatus} from '../../consts';

const mockStore = configureStore({});

describe('Component: Header', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
    const initialState = {
      USER: {
        authorizationStatus: AuthorizationStatus.AUTH,
      },
    };
    const logoMarkup =
      '<span class="logo__letter logo__letter--1">W</span><span class="logo__letter logo__letter--2">T</span><span class="logo__letter logo__letter--3">W</span>';
    const testChild = <h1 className="page-title user-page__title">My list</h1>;

    const {getByTitle, getByText} = render(
      <Provider store={mockStore(initialState)}>
        <Router history={history}>
          <Header>
            {testChild}
          </Header>
        </Router>
      </Provider>,
    );

    expect(getByTitle('logotype')).toContainHTML(logoMarkup);
    expect(getByText('My list')).toBeInTheDocument();
  });
});

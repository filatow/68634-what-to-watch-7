import React from 'react';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {createMemoryHistory} from 'history';
import {Router} from 'react-router-dom';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';
import SignIn from './sign-in';

const mockStore = configureStore({});

describe('Component: SignIn', () => {
  it('should render "SignIn" when user navigate to "/login"', () => {
    const history = createMemoryHistory();
    history.push('/login');

    render(
      <Provider store={mockStore({})}>
        <Router history={history}>
          <SignIn />
        </Router>
      </Provider>,
    );

    expect(screen.getByTestId('page-title')).toHaveTextContent(/Sign in/i);
    expect(screen.getByLabelText(/Email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();

    userEvent.type(screen.getByTestId('user-email'), 'log@in.com');
    userEvent.type(screen.getByTestId('user-password'), 'pass');

    expect(screen.getByDisplayValue(/log@in\.com/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue(/pass/i)).toBeInTheDocument();

  });
});

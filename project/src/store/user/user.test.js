import {user} from './user';
import {AuthorizationStatus} from '../../consts';
import {ActionType} from '../action';

describe('Reducer: user', () => {
  it('without additional parameters should return initial state', () => {
    const initialState = {
      authorizationStatus: AuthorizationStatus.UNKNOWN,
    };

    expect(user(initialState, {})).toEqual({
      ...initialState,
    });
  });

  it('should set authorizationStatus with payload', () => {
    const initialState = {
      authorizationStatus: AuthorizationStatus.UNKNOWN,
    };
    const requireAuthorizationAction = {
      type: ActionType.REQUIRE_AUTHORIZATION,
      payload: 'current authorization status',
    };

    expect(user(initialState, requireAuthorizationAction)).toEqual({
      authorizationStatus: 'current authorization status',
    });
  });

  it('should set authorization status to no_auth', () => {
    const initialState = {
      authorizationStatus: AuthorizationStatus.UNKNOWN,
    };
    const logoutAction = {
      type: ActionType.LOGOUT,
    };

    expect(user(initialState, logoutAction)).toEqual({
      authorizationStatus: AuthorizationStatus.NO_AUTH,
    });
  });

});

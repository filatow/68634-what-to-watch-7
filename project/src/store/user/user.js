import {
  catchAuthorizationError,
  loadAuthInfo,
  logout,
  nullifyAuthorizationErrorCode,
  requireAuthorization,
  resetAuthInfo
} from '../action';
import { AuthorizationStatus } from '../../consts';
import {createReducer} from '@reduxjs/toolkit';

const initialState = {
  authorizationStatus: AuthorizationStatus.UNKNOWN,
  authInfo: {},
  authorizationErrorCode: null,
};

const user = createReducer(initialState, (builder) => {
  builder
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(logout, (state) => {
      state.authorizationStatus = AuthorizationStatus.NO_AUTH;
    })
    .addCase(loadAuthInfo, (state, action) => {
      state.authInfo = action.payload;
    })
    .addCase(resetAuthInfo, (state) => {
      state.authInfo = {};
    })
    .addCase(catchAuthorizationError, (state, action) => {
      state.authorizationErrorCode = action.payload;
    })
    .addCase(nullifyAuthorizationErrorCode, (state) => {
      state.authorizationErrorCode = null;
    });
});

export {user};

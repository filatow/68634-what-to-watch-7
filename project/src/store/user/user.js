import {loadAuthInfo, logout, requireAuthorization, resetAuthInfo} from '../action';
import { AuthorizationStatus } from '../../consts';
import {createReducer} from '@reduxjs/toolkit';

const initialState = {
  authorizationStatus: AuthorizationStatus.UNKNOWN,
  authInfo: {},
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
    });
});

export {user};

import {ActionType} from '../action';
import { AuthorizationStatus } from '../../consts';

const initialState = {
  authorizationStatus: AuthorizationStatus.UNKNOWN,
};


const user = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.REQUIRE_AUTHORIZATION:
      return {
        ...state,
        authorizationStatus: action.payload,
      };
    case ActionType.LOGOUT:
      return {
        ...state,
        authorizationStatus: AuthorizationStatus.NO_AUTH,
      };
    default:
      return state;
  }
};

export {user};

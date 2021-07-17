import { AuthorizationStatus } from '../../consts';
import {NameSpace} from '../root-reducer';


export const getAuthorizationStatus = (state) => state[NameSpace.USER].authorizationStatus;
export const getIsAuthorized = (state) =>
  state[NameSpace.USER].authorizationStatus === AuthorizationStatus.AUTH;

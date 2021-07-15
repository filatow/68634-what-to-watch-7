import {ActionType} from '../action';
import {LoadedData} from '../../consts';

const getLoadingObject = (source = {}) => Array.from(Object.values(source))
  .reduce((accum, value) => {
    accum[value] = false;
    return accum;
  }, {});

const initialState = {
  isLoading: getLoadingObject(LoadedData),
};


const loading = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.START_LOADING:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          [action.payload]: true,
        },
      };
    case ActionType.STOP_LOADING:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          [action.payload]: false,
        },
      };
    default:
      return state;
  }
};

export {loading};

import {ActionType} from '../action';
import {loading} from './loading';
import {LoadedData} from '../../consts';
import {getLoadingObject} from '../../utils';

describe('Reducer: loading', () => {
  it('without passing in correct action return initial state', () => {
    const initialState = {
      isLoading: getLoadingObject(LoadedData),
    };

    expect(loading(initialState, {})).toEqual({
      ...initialState,
    });
  });

  it.each(
    Object.values(LoadedData),
  )('should set %s field of isLoading object to true', (dataName) => {
    const initialState = {
      isLoading: getLoadingObject(LoadedData),
    };
    const startLoadingAction = {
      type: ActionType.START_LOADING,
      payload: dataName,
    };

    expect(loading(initialState, startLoadingAction)).toEqual({
      isLoading: {
        ...initialState.isLoading,
        [dataName]: true,
      },
    });
  });

  it.each(
    Object.values(LoadedData),
  )('should set %s field of isLoading object to false', (dataName) => {
    const initialState = {
      isLoading: getLoadingObject(LoadedData, true),
    };
    const stopLoadingAction = {
      type: ActionType.STOP_LOADING,
      payload: dataName,
    };

    expect(loading(initialState, stopLoadingAction)).toEqual({
      isLoading: {
        ...initialState.isLoading,
        [dataName]: false,
      },
    });
  });
});

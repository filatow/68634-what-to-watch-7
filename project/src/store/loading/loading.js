import {startLoading, stopLoading} from '../action';
import {LoadedData} from '../../consts';
import {createReducer} from '@reduxjs/toolkit';
import {getLoadingObject} from '../../utils';

const initialState = {
  isLoading: getLoadingObject(LoadedData),
};

const loading = createReducer(initialState, (builder) => {
  builder
    .addCase(startLoading, (state, action) => {
      state.isLoading[action.payload] = true;
    })
    .addCase(stopLoading, (state, action) => {
      state.isLoading[action.payload] = false;
    });
});

export {loading};

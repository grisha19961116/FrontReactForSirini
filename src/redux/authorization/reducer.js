import { createReducer } from '@reduxjs/toolkit';

import { actionSignInSuccess, actionSignOutSuccess } from './actions.js';

const initialState = { name: '', token: '', email: '' };

const reducerAuthorization = createReducer(initialState, {
  [actionSignInSuccess]: (_, { payload }) => {
    return { ...initialState, ...payload };
  },

  [actionSignOutSuccess]: ({ email }, _) => {
    return { name: '', token: '', email };
  },
});

export default reducerAuthorization;

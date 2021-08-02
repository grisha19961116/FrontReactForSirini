import { createAction } from '@reduxjs/toolkit';

const actionSignInSuccess = createAction('signIn/success', value => ({
  payload: value,
}));

const actionSignOutSuccess = createAction('signOut/success', value => ({
  payload: value,
}));

export { actionSignInSuccess, actionSignOutSuccess };

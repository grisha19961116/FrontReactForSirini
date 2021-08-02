import { toast } from 'react-toastify';
import { actionIsLoading } from '../loading/actions';
import { actionSignInSuccess, actionSignOutSuccess } from './actions.js';
import { postSignInUser, postSignOut, postRegistrationUser } from 'data/api';

import { managerToken } from 'data/api';

const initialState = { name: '', token: '', email: '' };

const asyncSignOut = () => async dispatch => {
  let check = null;
  try {
    dispatch(actionIsLoading(true));
    await postSignOut();
    managerToken.removeToken();
    dispatch(actionSignOutSuccess());
    check = true;
  } catch (err) {
    check = false;
    dispatch(actionSignOutSuccess(initialState));
  } finally {
    dispatch(actionIsLoading(false));
    check === true &&
      toast.info(`👋 Goodby!`, {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    check === false &&
      toast.error('🚀 Server error!', {
        position: 'bottom-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
  }
};

const asyncSignIn = credentials => async dispatch => {
  let userEmail = null;

  try {
    dispatch(actionIsLoading(true));
    const { token, email } = await postSignInUser(credentials);
    managerToken.setToken(token);

    dispatch(actionSignInSuccess({ token, email }));
    userEmail = email;
  } catch (err) {
    userEmail = null;
    dispatch(actionSignInSuccess(initialState));
  } finally {
    dispatch(actionIsLoading(false));
    userEmail &&
      toast.success(`🤟 Hello darling <<${userEmail}>> !`, {
        position: 'bottom-left',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    !userEmail &&
      toast.error('🚀 Wrong credentials!', {
        position: 'bottom-left',
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
  }
};

const asyncRegistrationNewUser = user => async dispatch => {
  const { email } = user;

  try {
    dispatch(actionIsLoading(true));
    await postRegistrationUser(user);
    toast.success(`🦄 User created "${email}" !`, {
      position: 'bottom-left',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  } catch (error) {
    dispatch(actionSignInSuccess(initialState));
    toast.error(`⚠️ Email is used ${email}`, {
      position: 'bottom-left',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  } finally {
    dispatch(actionIsLoading(false));
  }
};

export { asyncSignIn, asyncSignOut, asyncRegistrationNewUser };

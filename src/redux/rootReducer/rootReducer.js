import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import reducerAuthorization from '../authorization/reducer';
import reducerProjects from '../projects/reducer';
import reducerLoading from '../loading/reducer';

const contactPersistConfig = {
  key: 'token',
  storage: storage,
};

export const rootReducer = combineReducers({
  projects: reducerProjects,
  auth: persistReducer(contactPersistConfig, reducerAuthorization),
  isLoading: reducerLoading,
});

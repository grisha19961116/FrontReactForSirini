import { createReducer } from '@reduxjs/toolkit';

import {
  actionAddProject,
  actionRemoveProject,
  actionUpdateProject,
  actionGetProjects,
} from './actions.js';

const reducerProjects = createReducer([], {
  [actionUpdateProject]: (state, { payload }) => {
    let index;
    state.find((contact, i) => {
      if (contact.id === payload.id) index = i;
    });
    const contactUpdate = [...state];
    contactUpdate[index] = payload;
    return contactUpdate;
  },

  [actionAddProject]: (state, { payload }) => {
    const contactsAdd = [...state, payload];
    return contactsAdd;
  },

  [actionRemoveProject]: (state, { payload }) => {
    const contactsRemove = [...state.filter(contact => contact.id !== payload)];
    return contactsRemove;
  },

  [actionGetProjects]: (_, { payload }) => {
    return payload;
  },
});

export default reducerProjects;

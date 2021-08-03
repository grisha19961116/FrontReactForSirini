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
    state.find((project, i) => {
      if (project.id === payload.id) index = i;
    });
    const projectUpdate = [...state];
    projectUpdate[index] = payload;
    return projectUpdate;
  },

  [actionAddProject]: (state, { payload }) => {
    const projectsAdd = [...state, payload];
    return projectsAdd;
  },

  [actionRemoveProject]: (state, { payload }) => {
    const projectRemove = [...state.filter(project => project.id !== payload)];
    return projectRemove;
  },

  [actionGetProjects]: (state, { payload }) => {
    const projectsGet = [...state, ...payload];
    return projectsGet;
  },
});

export default reducerProjects;

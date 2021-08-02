import { createSelector } from 'reselect';

const getProjects = state => state.projects;
const getState = state => state;

const getProjectsMemo = createSelector([getProjects], projects => projects);

export { getProjectsMemo, getState };

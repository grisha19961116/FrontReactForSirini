import { createAction } from '@reduxjs/toolkit';

const actionAddProject = createAction('projects/add', newContact => ({
  payload: newContact,
}));

const actionRemoveProject = createAction('projects/remove', id => ({
  payload: id,
}));

const actionUpdateProject = createAction('projects/update', contact => ({
  payload: contact,
}));

const actionGetProjects = createAction('projects/get', contacts => ({
  payload: contacts,
}));

export {
  actionAddProject,
  actionRemoveProject,
  actionUpdateProject,
  actionGetProjects,
};

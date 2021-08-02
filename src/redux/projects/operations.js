import { toast } from 'react-toastify';
import {
  actionAddProject,
  actionRemoveProject,
  actionUpdateProject,
  actionGetProjects,
} from './actions';

import { actionIsLoading } from '../loading/actions';

import {
  getAllProjects,
  postAddNewProject,
  deleteProject,
  postUpdateProject,
} from 'data/api';

const errLogger = ({ message }) =>
  toast.error(`🚀 ${message}!`, {
    position: 'bottom-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });

const asyncOperationGetProjects = () => async dispatch => {
  try {
    dispatch(actionIsLoading(true));
    const data = await getAllProjects();
    dispatch(actionGetProjects(data));
  } catch (err) {
    errLogger(err);
  } finally {
    dispatch(actionIsLoading(false));
  }
};

const asyncOperationAddProject = project => async dispatch => {
  try {
    dispatch(actionIsLoading(true));
    const data = await postAddNewProject(project);
    dispatch(actionAddProject(data));
  } catch (err) {
    errLogger(err);
  } finally {
    dispatch(actionIsLoading(false));
  }
};

const asyncOperationRemoveProject = id => async dispatch => {
  try {
    dispatch(actionIsLoading(true));
    await deleteProject(id);
    dispatch(actionRemoveProject(id));
  } catch (err) {
    errLogger(err);
  } finally {
    dispatch(actionIsLoading(false));
  }
};

const asyncOperationUpdateProject = (id, project) => async dispatch => {
  try {
    dispatch(actionIsLoading(true));
    const data = await postUpdateProject(id, project);
    dispatch(actionUpdateProject(data));
  } catch (err) {
    errLogger(err);
  } finally {
    dispatch(actionIsLoading(false));
  }
};

export {
  asyncOperationGetProjects,
  asyncOperationAddProject,
  asyncOperationRemoveProject,
  asyncOperationUpdateProject,
};

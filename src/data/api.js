const axios = require('axios');
axios.defaults.baseURL = 'http://localhost:3000/api';

const managerToken = {
  setToken(token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  removeToken() {
    axios.defaults.headers.common.Authorization = '';
  },
};

const postRegistrationUser = async user => {
  const { data } = await axios.post(`/users/registration`, user);
  return data;
};
const postSignInUser = async credentials => {
  const {
    data: { data },
  } = await axios.post(`/users/login`, credentials);
  return data;
};

const postSignOut = async () => await axios.post(`/users/logout`);

const postAddNewProject = async body => {
  const data = await axios.post(`/projects`, body);
  return data;
};

const deleteProject = async id => await axios.delete(`/projects/${id}`);

const postUpdateProject = async (id, project) => {
  const { data } = await axios.patch(`/projects/${id}`, project);
  return data;
};
const getAllProjects = async () => {
  const { data } = await axios.get(`/projects`);
  return data;
};

export {
  managerToken,
  postRegistrationUser,
  postSignInUser,
  postSignOut,
  postAddNewProject,
  deleteProject,
  postUpdateProject,
  getAllProjects,
};

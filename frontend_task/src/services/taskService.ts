import axios from 'axios';

export const getTasks = () => {
  return axios.get('/api/tasks');
};

export const getTaskStats = () => {
  return axios.get('/api/tasks/stats');
};

export const createTask = (taskData: any) => {
  return axios.post('/api/tasks', taskData);
};

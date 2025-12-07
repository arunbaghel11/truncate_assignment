import axios from 'axios';

const API = axios.create({
  baseURL: 'https://truncate-assignment.onrender.com/api'
});

export default {
  get: (path, opts) => API.get(path, opts)
};

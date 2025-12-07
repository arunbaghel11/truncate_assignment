import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api'
});

export default {
  get: (path, opts) => API.get(path, opts)
};

import axios from 'axios';

const baseURL =  "http://localhost:3001"; //"http://162.255.117.211/api" //
const apiService = axios.create({
  baseURL,
  withCredentials: true
});

export default apiService;
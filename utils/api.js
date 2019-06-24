import axios from 'axios'

export default axios.create({
    baseURL: '/api',
    timeout: 1000,
    withCredentials: true
    // proxy: {
    //     host: '127.0.0.1',
    //     port: 3000,
    // }
  });
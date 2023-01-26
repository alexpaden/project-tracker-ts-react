import axios from 'axios'
import storage from './utils/localStorage'

const http = axios.create({
  baseURL: 'https://project-manager-375822.uc.r.appspot.com/',
  //baseURL: 'http://localhost:3001/',
  headers: {
    'Content-type': 'application/json',
  },
})

http.interceptors.request.use(
  (config) => {
    const token = storage.loadUser()?.token
    if (token) {
      config.headers['x-auth-token'] = token
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default http

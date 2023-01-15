import http from '../http-common'
import { setConfig } from './authService'

const getUsers = async () => {
  const response = await http.get('/users', setConfig())
  return response.data
}

const userService = { getUsers }

export default userService

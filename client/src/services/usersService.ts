import http from '../http-common'

const getUsers = async () => {
  const response = await http.get('/users')
  return response.data
}

const userService = { getUsers }

export default userService

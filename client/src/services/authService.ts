import http from '../http-common'

interface Credentials {
  username: string
  password: string
}

type Token = string | null

let token: Token = null

const setToken = (newToken: string) => {
  token = newToken
}

const login = async (credentials: Credentials) => {
  const response = await http.post('/login', credentials)
  return response.data
}

const signup = async (credentials: Credentials) => {
  const response = await http.post('/signup', credentials)
  return response.data
}

const authService = { login, signup, setToken }

export default authService

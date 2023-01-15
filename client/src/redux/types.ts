export interface ProjectState {
  id: string
  name: string
  bugs: Array<{ id: string }>
  createdAt: Date
  updatedAt: Date
}

export interface ProjectPayload {
  name: string
}

export interface NotifPayload {
  message: string
  type: 'success' | 'error'
}

export interface UserState {
  id: string
  username: string
  token: string
}

export interface User {
  id: string
  username: string
}

export interface CredentialsPayload {
  username: string
  password: string
}

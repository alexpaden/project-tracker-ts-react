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

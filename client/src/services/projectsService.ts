import http from '../http-common'
import { ProjectPayload } from '../redux/types'

const getProjects = async () => {
  const response = await http.get('/projects')
  return response.data
}

const createProject = async (projectData: ProjectPayload) => {
  const response = await http.post('/projects', projectData)
  return response.data
}

const deleteProject = async (projectId: string) => {
  const response = await http.delete(`/projects/${projectId}`)
  console.log(response.data)
  return response.data
}

const editProjectName = async (projectId: string, newName: string) => {
  const response = await http.put(`/projects/${projectId}`, { name: newName })
  return response.data
}

const projectService = {
  getProjects,
  createProject,
  deleteProject,
  editProjectName,
}

export default projectService

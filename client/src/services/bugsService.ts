import http from '../http-common'
import { BugPayload } from '../redux/types'

const getBugs = async (projectId: string) => {
  const response = await http.get(`/projects/${projectId}/bugs`)
  return response.data
}

const createBug = async (projectId: string, bugData: BugPayload) => {
  const response = await http.post(`/projects/${projectId}/bugs`, bugData)
  return response.data
}

const updateBug = async (
  projectId: string,
  bugId: string,
  bugData: BugPayload
) => {
  const response = await http.put(
    `/projects/${projectId}/bugs/${bugId}`,
    bugData
  )
  return response.data
}

const deleteBug = async (projectId: string, bugId: string) => {
  const response = await http.delete(`/projects/${projectId}/bugs/${bugId}`)
  return response.data
}

const closeBug = async (projectId: string, bugId: string) => {
  const response = await http.post(`/projects/${projectId}/bugs/${bugId}/close`)
  return response.data
}

const reopenBug = async (projectId: string, bugId: string) => {
  const response = await http.post(
    `/projects/${projectId}/bugs/${bugId}/reopen`
  )
  return response.data
}

const bugService = {
  getBugs,
  createBug,
  updateBug,
  deleteBug,
  closeBug,
  reopenBug,
}

export default bugService

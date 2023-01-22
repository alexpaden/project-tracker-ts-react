import http from '../http-common'

const createNote = async (
  projectId: string,
  bugId: string,
  noteBody: string
) => {
  const response = await http.post(
    `/projects/${projectId}/bugs/${bugId}/notes`,
    { body: noteBody }
  )
  return response.data
}

const editNote = async (
  projectId: string,
  noteId: number,
  noteBody: string
) => {
  const response = await http.put(`/projects/${projectId}/notes/${noteId}`, {
    body: noteBody,
  })
  return response.data
}

const deleteNote = async (projectId: string, noteId: number) => {
  const response = await http.delete(`/projects/${projectId}/notes/${noteId}`)
  return response.data
}

const noteService = {
  createNote,
  editNote,
  deleteNote,
}

export default noteService

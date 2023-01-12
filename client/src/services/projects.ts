import axios from 'axios'
import IProjectData from '../types/project'
import http from '../http-common'

class ProjectService {
  async getAll() {
    const result = await http.get<Array<IProjectData>>(`/projects`)
    return result.data;
  }
}

export default new ProjectService()

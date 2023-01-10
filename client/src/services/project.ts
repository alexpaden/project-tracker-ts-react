import axios from "axios";
import IProjectData from "../types/project";

class ProjectService {
  getAll() {
    return axios.get<Array<IProjectData>>("http://localhost:8000/projects");
  }
}

export default new ProjectService();
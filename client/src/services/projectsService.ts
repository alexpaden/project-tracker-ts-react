import http from '../http-common'


const getProjects = async () => {
  const response = await http.get('/projects');
  return response.data;
};

const projectService = {
  getProjects,
};

export default projectService;

import { useReducer } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchProjects,
  selectProjectsState,
} from '../redux/slices/projectsSlice'

const ProjectsPage = () => {
  const dispatch = useDispatch()
  dispatch(fetchProjects())
  const { projects } = useSelector(selectProjectsState)

  return (
    <div>
      <h1>Projects</h1>
      <ul>
        {projects.map((project) => (
          <li key={project.id}>{project.name}</li>
        ))}
      </ul>
    </div>
  )
}

export default ProjectsPage

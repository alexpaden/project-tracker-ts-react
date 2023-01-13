import { useEffect, useReducer } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ProjectsTable from '../components/ProjectsTable'
import {
  fetchProjects,
  selectProjectsState,
} from '../redux/slices/projectsSlice'

const ProjectsPage = () => {
  const { projects } = useSelector(selectProjectsState)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchProjects())
  }, [dispatch])

  return (
    <div>
      <h1>Projects</h1>
      <ProjectsTable projects={projects} />
    </div>
  )
}

export default ProjectsPage

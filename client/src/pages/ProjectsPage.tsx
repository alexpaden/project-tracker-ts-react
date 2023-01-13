import { useEffect, useReducer } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ProjMiniTable from '../components/ProjMiniTable'
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
      <ProjMiniTable projects={projects} />
    </div>
  )
}

export default ProjectsPage

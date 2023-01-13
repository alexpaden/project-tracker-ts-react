import { useEffect, useReducer } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ProjMiniTable from '../components/ProjMiniTable'
import {
  fetchProjects,
  selectProjectsState,
} from '../redux/slices/projectsSlice'

const ProjectsPage = () => {
  return (
    <div>
      <h1>Projects</h1>
    </div>
  )
}

export default ProjectsPage

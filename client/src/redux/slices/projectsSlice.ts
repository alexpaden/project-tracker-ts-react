import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState, AppThunk } from '../store'
import projectService from '../../services/projectsService'
import { ProjectState } from '../types'

interface InitialProjectsState {
  projects: ProjectState[]
}

const initialState: InitialProjectsState = {
  projects: [],
}

const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    setProjects: (state, action: PayloadAction<ProjectState[]>) => {
      state.projects = action.payload
    },
  },
})

export const { setProjects } = projectsSlice.actions

export const fetchProjects = (): AppThunk => {
  return async (dispatch) => {
    try {
      const allProjects = await projectService.getProjects()
      dispatch(setProjects(allProjects))
    } catch (e) {
      console.log(e)
    }
  }
}

export const selectProjectsState = (state: RootState) => state.projects

export const selectProjectById = (state: RootState, projectId: string) => {
  return state.projects.projects.find((p) => p.id === projectId)
}

export default projectsSlice.reducer

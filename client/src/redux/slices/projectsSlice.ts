import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState, AppThunk } from '../store'
import projectService from '../../services/projectsService'
import { ProjectState } from '../types'
import { getErrorMsg } from '../../utils/helperFuncs'

interface InitialProjectsState {
  projects: ProjectState[]
  fetchError: string | null
  fetchStatus: 'idle' | 'loading' | 'succeeded' | 'failed'
  submitError: string | null
}

const initialState: InitialProjectsState = {
  projects: [],
  fetchStatus: 'idle',
  fetchError: null,
  submitError: null,
}

const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    setProjects: (state, action: PayloadAction<ProjectState[]>) => {
      state.projects = action.payload
      state.fetchStatus = 'succeeded'
      state.fetchError = null
    },
    setFetchProjectsError: (state, action: PayloadAction<string>) => {
      state.fetchStatus = 'failed'
      state.fetchError = action.payload
    },
  },
})

export const { setProjects, setFetchProjectsError } = projectsSlice.actions

export const fetchProjects = (): AppThunk => {
  return async (dispatch) => {
    try {
      const allProjects = await projectService.getProjects()
      dispatch(setProjects(allProjects))
    } catch (e: any) {
      dispatch(setFetchProjectsError(getErrorMsg(e)))
    }
  }
}

export const selectProjectsState = (state: RootState) => state.projects

export const selectProjectById = (state: RootState, projectId: string) => {
  return state.projects.projects.find((p) => p.id === projectId)
}

export default projectsSlice.reducer

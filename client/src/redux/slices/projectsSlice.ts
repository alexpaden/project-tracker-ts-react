import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState, AppThunk } from '../store'
import projectService from '../../services/projectsService'
import { ProjectState, ProjectPayload, ProjectSortValues } from '../types'
import { notify } from './notificationSlice'
import { getErrorMsg } from '../../utils/helperFuncs'

interface InitialProjectsState {
  projects: ProjectState[]
  fetchStatus: 'idle' | 'loading' | 'succeeded' | 'failed'
  fetchError: string | null
  submitLoading: boolean
  submitError: string | null
  sortBy: ProjectSortValues
}

const initialState: InitialProjectsState = {
  projects: [],
  fetchStatus: 'idle',
  fetchError: null,
  submitLoading: false,
  submitError: null,
  sortBy: 'newest',
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
    addProject: (state, action: PayloadAction<ProjectState>) => {
      state.projects.push(action.payload)
      state.submitLoading = false
      state.submitError = null
    },
    removeProject: (state, action: PayloadAction<string>) => {
      state.projects = state.projects.filter((p) => p.id !== action.payload)
      state.submitLoading = false
      state.submitError = null
    },
    updateProjectName: (
      state,
      action: PayloadAction<{
        data: { name: string; updatedAt: Date }
        projectId: string
      }>
    ) => {
      state.projects = state.projects.map((p) =>
        p.id === action.payload.projectId ? { ...p, ...action.payload.data } : p
      )
      state.submitLoading = false
      state.submitError = null
    },
    setFetchProjectsLoading: (state) => {
      state.fetchStatus = 'loading'
      state.fetchError = null
    },
    setFetchProjectsError: (state, action: PayloadAction<string>) => {
      state.fetchStatus = 'failed'
      state.fetchError = action.payload
    },

    setSubmitProjectLoading: (state) => {
      state.submitLoading = true
      state.submitError = null
    },
    setSubmitProjectError: (state, action: PayloadAction<string>) => {
      state.submitLoading = false
      state.submitError = action.payload
    },
    clearSubmitProjectError: (state) => {
      state.submitError = null
    },
    sortProjectsBy: (state, action: PayloadAction<ProjectSortValues>) => {
      state.sortBy = action.payload
    },
  },
})

export const {
  setProjects,
  addProject,
  removeProject,
  updateProjectName,
  setFetchProjectsLoading,
  setFetchProjectsError,
  setSubmitProjectLoading,
  setSubmitProjectError,
  clearSubmitProjectError,
  sortProjectsBy,
} = projectsSlice.actions

export const fetchProjects = (): AppThunk => {
  return async (dispatch) => {
    try {
      dispatch(setFetchProjectsLoading())
      const allProjects = await projectService.getProjects()
      dispatch(setProjects(allProjects))
    } catch (e: any) {
      dispatch(setFetchProjectsError(getErrorMsg(e)))
    }
  }
}

export const createNewProject = (
  projectData: ProjectPayload,
  closeDialog?: () => void
): AppThunk => {
  return async (dispatch) => {
    try {
      dispatch(setSubmitProjectLoading())
      const newProject = await projectService.createProject(projectData)
      dispatch(addProject(newProject))
      dispatch(notify('New project added!', 'success'))
      closeDialog && closeDialog()
    } catch (e: any) {
      dispatch(setSubmitProjectError(getErrorMsg(e)))
    }
  }
}

export const deleteProject = (projectId: string): AppThunk => {
  return async (dispatch) => {
    try {
      await projectService.deleteProject(projectId)
      dispatch(removeProject(projectId))
      dispatch(notify('Deleted the project.', 'success'))
    } catch (e: any) {
      dispatch(notify(getErrorMsg(e), 'error'))
    }
  }
}

export const editProjectName = (
  projectId: string,
  name: string,
  closeDialog?: () => void
): AppThunk => {
  return async (dispatch) => {
    try {
      dispatch(setSubmitProjectLoading())
      const updatedProject = await projectService.editProjectName(
        projectId,
        name
      )
      dispatch(
        updateProjectName({
          data: {
            name: updatedProject.name,
            updatedAt: updatedProject.updatedAt,
          },
          projectId,
        })
      )
      dispatch(notify("Edited the project's name!", 'success'))
      closeDialog && closeDialog()
    } catch (e: any) {
      dispatch(setSubmitProjectError(getErrorMsg(e)))
    }
  }
}

export const selectProjectsState = (state: RootState) => state.projects

export const selectProjectById = (state: RootState, projectId: string) => {
  return state.projects.projects.find((p) => p.id === projectId)
}

export default projectsSlice.reducer

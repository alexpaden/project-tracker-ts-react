import { configureStore, Action } from '@reduxjs/toolkit'
import { ThunkAction } from 'redux-thunk'
import projectsReducer from './slices/projectsSlice'
import notificationReducer from './slices/notificationSlice'
import type {} from 'redux-thunk/extend-redux'

const store = configureStore({
  reducer: {
    projects: projectsReducer,
    notification: notificationReducer,
  },
})

export type AppDispatch = typeof store.dispatch

export type RootState = ReturnType<typeof store.getState>

export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>

export default store

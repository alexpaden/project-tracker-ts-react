import { configureStore, Action } from '@reduxjs/toolkit'
import { ThunkAction } from 'redux-thunk'
import projectsReducer from './slices/projectsSlice'
import notificationReducer from './slices/notificationSlice'
import type {} from 'redux-thunk/extend-redux'
import authReducer from './slices/authSlice'
import usersReducer from './slices/usersSlice'
import bugsReducer from './slices/bugsSlice'
import themesReducer from './slices/themesSlice'

const store = configureStore({
  reducer: {
    projects: projectsReducer,
    notification: notificationReducer,
    auth: authReducer,
    users: usersReducer,
    bugs: bugsReducer,
    themes: themesReducer,
  },
})

export type AppDispatch = typeof store.dispatch

export type RootState = ReturnType<typeof store.getState>

export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>

export default store

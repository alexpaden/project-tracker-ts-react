import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ProjectsPage from './pages/ProjectsPage'
import { Provider } from 'react-redux'
import store from './redux/store'
import NotFoundPage from './pages/NotFoundPage'
import SignupPage from './pages/Auth/SignupPage'
import LoginPage from './pages/Auth/LoginPage'
import ProjectDetailsPage from './pages/ProjectDetailPage'
import BugDetailsPage from './pages/BugDetailsPage'

const rootElement = document.getElementById('root')
if (!rootElement) throw new Error('Failed to find the root element')
const root = createRoot(rootElement)

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/projects',
    element: <ProjectsPage />,
  },
  {
    path: '/projects/:projectId',
    element: <ProjectDetailsPage />,
  },
  {
    path: '/projects/:projectId/bugs/:bugId',
    element: <BugDetailsPage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/signup',
    element: <SignupPage />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
])

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()

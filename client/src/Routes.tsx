import {
  Route,
  Routes,
  BrowserRouter,
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom'
import LoginPage from './pages/Auth/LoginPage'
import SignupPage from './pages/Auth/SignupPage'
import ProjectsPage from './pages/ProjectsPage'
import ProjectDetailsPage from './pages/ProjectDetailPage'
import BugDetailsPage from './pages/BugDetailsPage'
import NotFoundPage from './pages/NotFoundPage'
import { useSelector } from 'react-redux'
import { selectAuthState } from './redux/slices/authSlice'
import storage from './utils/localStorage'

import { Container, useMediaQuery } from '@material-ui/core'
import { useTheme } from '@material-ui/core/styles'

const ProjRoutes = () => {
  const { user } = useSelector(selectAuthState)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'))

  const isLoggedIn = storage.loadUser() || user

  return (
    <Container>
      <Routes>
        <Route path="/" element={<ProjectsPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/projects/:projectId" element={<ProjectDetailsPage />} />
        <Route
          path="/projects/:projectId/bugs/:bugId"
          element={<BugDetailsPage />}
        />
        {isLoggedIn ? (
          <Route path="/login" element={<ProjectsPage />} />
        ) : (
          <Route path="/login" element={<LoginPage />} />
        )}
        {isLoggedIn ? (
          <Route path="/signup" element={<ProjectsPage />} />
        ) : (
          <Route path="/signup" element={<SignupPage />} />
        )}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Container>
  )
}

export default ProjRoutes

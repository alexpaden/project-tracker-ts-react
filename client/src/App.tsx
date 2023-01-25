import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { autoLogin } from './redux/slices/authSlice'
import { selectThemeState, toggleDarkMode } from './redux/slices/themesSlice'
import NavBar from './components/NavBar'
import ToastNotification from './components/ToastNotifications'
import storage from './utils/localStorage'

import customTheme from './styles/customTheme'
import { useBodyStyles } from './styles/muiStyles'
import { ThemeProvider } from '@material-ui/core/styles'
import ProjRoutes from './Routes'

const App = () => {
  const dispatch = useDispatch()
  const { darkMode } = useSelector(selectThemeState)
  const classes = useBodyStyles(darkMode)()

  useEffect(() => {
    dispatch(autoLogin())
  }, [])

  useEffect(() => {
    const loadedDarkMode = storage.loadDarkMode()
    if (loadedDarkMode && !darkMode) {
      dispatch(toggleDarkMode())
    }
  }, [])

  return (
    <ThemeProvider theme={customTheme(darkMode)}>
      <div className={classes.root}>
        <NavBar />
        <ProjRoutes />
        <ToastNotification />
      </div>
    </ThemeProvider>
  )
}

export default App

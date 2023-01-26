import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { autoLogin } from './redux/slices/authSlice'
import { selectThemeState, toggleDarkMode } from './redux/slices/themesSlice'
import NavBar from './components/menu/NavBar'
import ToastNotification from './components/menu/ToastNotifications'
import storage from './utils/localStorage'

import customTheme from './styles/customTheme'
import { useBodyStyles } from './styles/muiStyles'
import { ThemeProvider } from '@material-ui/core/styles'
import ProjRoutes from './routes'

const App = () => {
  const dispatch = useDispatch()
  const { darkMode } = useSelector(selectThemeState)
  const classes = useBodyStyles(darkMode)()

  useEffect(() => {
    dispatch(autoLogin())
  }, [dispatch])

  useEffect(() => {
    const loadedDarkMode = storage.loadDarkMode()
    if (loadedDarkMode && !darkMode) {
      dispatch(toggleDarkMode())
    }
  }, [dispatch, darkMode])

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

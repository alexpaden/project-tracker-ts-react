import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { selectAuthState, logout } from '../redux/slices/authSlice'
import NavMenu from './NavMenu'
import NavMenuMobile from './NavMenuMobile'

import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  useMediaQuery,
  Container,
} from '@material-ui/core'
import { useNavStyles } from '../styles/muiStyles'
import { useTheme } from '@material-ui/core/styles'
import FavoriteIcon from '@material-ui/icons/Favorite'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'

const NavBar = () => {
  const { user } = useSelector(selectAuthState)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const classes = useNavStyles()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'))

  const handleLogout = () => {
    dispatch(logout())
    navigate('/login')
  }

  const handleGoBack = () => {
    if (pathname.includes('/bugs')) {
      navigate(`${pathname.slice(0, pathname.indexOf('/bugs'))}`)
    } else {
      navigate('/')
    }
  }

  const mainButton = () => {
    if (['/', '/login', '/signup'].includes(pathname)) {
      return (
        <div className={classes.logoWrapper}>
          <Button
            className={classes.logoBtn}
            component={RouterLink}
            to="/"
            color="secondary"
          >
            <img
              src={
                'https://cdn3d.iconscout.com/3d/premium/thumb/project-task-management-4500578-3735587.png'
              }
              alt="logo"
              className={classes.svgImage}
            />
            Project Manager
          </Button>
          {!isMobile && (
            <Typography variant="caption" color="secondary">
              <FavoriteIcon style={{ fontSize: 10 }} color="primary" /> by{' '}
            </Typography>
          )}
        </div>
      )
    } else {
      return (
        <Button
          startIcon={<ArrowBackIcon />}
          color="secondary"
          onClick={handleGoBack}
          className={classes.backBtn}
        >
          {pathname.includes('/bugs') ? 'Project' : 'Home'}
        </Button>
      )
    }
  }

  return (
    <Container disableGutters={isMobile} className={classes.container}>
      <AppBar elevation={1} color="inherit" position="static">
        <Toolbar variant="dense" disableGutters={isMobile}>
          <div className={classes.leftPortion}>{mainButton()}</div>
          <NavMenu
            isMobile={isMobile}
            user={user}
            handleLogout={handleLogout}
          />
          <NavMenuMobile
            isMobile={isMobile}
            user={user}
            handleLogout={handleLogout}
          />
        </Toolbar>
      </AppBar>
    </Container>
  )
}

export default NavBar

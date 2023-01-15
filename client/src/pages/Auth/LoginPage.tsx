import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link as RouterLink, redirect, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  login,
  clearAuthError,
  selectAuthState,
} from '../../redux/slices/authSlice'
import ErrorBox from '../../components/ErrorBox'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

import {
  TextField,
  Button,
  Typography,
  InputAdornment,
  IconButton,
  Link,
  Paper,
} from '@material-ui/core'
import { useAuthPageStyles } from '../../styles/muiStyles'
import PersonIcon from '@material-ui/icons/Person'
import LockIcon from '@material-ui/icons/Lock'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff'
import VisibilityIcon from '@material-ui/icons/Visibility'
import storage from '../../utils/localStorage'
import ProjectsPage from '../ProjectsPage'

interface InputValues {
  username: string
  password: string
}

const validationSchema = yup.object({
  username: yup.string().required('Required'),
  password: yup.string().required('Required'),
})

const LoginPage = () => {
  const classes = useAuthPageStyles()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { loading, error, user } = useSelector(selectAuthState)
  const [showPass, setShowPass] = useState<boolean>(false)
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<InputValues>({
    mode: 'onChange',
    resolver: yupResolver(validationSchema),
  })

  const handleLogin = ({ username, password }: InputValues) => {
    dispatch(login({ username, password }))
  }

  const isLoggedIn = storage.loadUser() || user

  if (!isLoggedIn) {
    return (
      <div>
        <Paper className={classes.root} elevation={2}>
          <img
            src="https://as2.ftcdn.net/v2/jpg/02/22/87/27/1000_F_222872740_Z330GnQzQ3COKtmVi74iCQs9me7oY0gx.jpg"
            alt="bug-logo"
            className={classes.titleLogo}
          />
          <form onSubmit={handleSubmit(handleLogin)} className={classes.form}>
            <div className={classes.inputField}>
              <TextField
                required
                fullWidth
                {...register('username')}
                name="username"
                type="text"
                label="Username"
                variant="outlined"
                error={'username' in errors}
                helperText={
                  'username' in errors ? errors.username?.message : ''
                }
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon color="primary" />
                    </InputAdornment>
                  ),
                }}
              />
            </div>
            <div className={classes.inputField}>
              <TextField
                required
                fullWidth
                {...register('password')}
                name="password"
                type={showPass ? 'text' : 'password'}
                label="Password"
                variant="outlined"
                error={'password' in errors}
                helperText={
                  'password' in errors ? errors.password?.message : ''
                }
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPass((prevState) => !prevState)}
                        size="small"
                      >
                        {showPass ? <VisibilityOffIcon /> : <VisibilityIcon />}
                      </IconButton>
                    </InputAdornment>
                  ),
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon color="primary" />
                    </InputAdornment>
                  ),
                }}
              />
            </div>
            <Button
              color="primary"
              variant="contained"
              size="large"
              fullWidth
              startIcon={<ExitToAppIcon />}
              type="submit"
              className={classes.submitButton}
              disabled={loading}
            >
              Log In
            </Button>
          </form>
          <Typography variant="body1" className={classes.footerText}>
            Don’t have an account?{' '}
            <Link
              className={classes.link}
              component={RouterLink}
              to="/signup"
              color="secondary"
            >
              Sign Up
            </Link>
          </Typography>
          {error && (
            <ErrorBox
              errorMsg={error}
              clearErrorMsg={() => dispatch(clearAuthError())}
            />
          )}
        </Paper>
      </div>
    )
  } else {
    navigate('/projects')
    return (
      <div>
        <ErrorBox
          errorMsg="user already logged in"
          clearErrorMsg={function (): void {}}
        />
        <br />
        <Button
          color="primary"
          className="px-4"
          onClick={() => navigate('/projects')}
        >
          Go to Projects Page
        </Button>
      </div>
    )
  }
}

export default LoginPage

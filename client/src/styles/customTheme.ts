import { createTheme } from '@material-ui/core/styles'

const customTheme = (darkMode: boolean) =>
  createTheme({
    palette: {
      type: darkMode ? 'dark' : 'light',
      primary: {
        main: '#060647',
        light: '#060647',
      },
      secondary: {
        main: darkMode ? '#c7c7c9' : '#a3a3a3',
      },
    },
    overrides: {
      MuiTypography: {
        root: {
          wordBreak: 'break-word',
        },
      },
    },
  })

export default customTheme

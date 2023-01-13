import { Paper, Typography } from '@material-ui/core'
import { useMainPageStyles } from '../styles/muiStyles'

const NotFoundPage = () => {
  const classes = useMainPageStyles()

  return (
    <div className={classes.root}>
      <Paper className={classes.notFoundPaper}>
        <div className={classes.notFoundWrapper}>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTx2Ss7y_m9DWDJKVN0TsdKeiUktLntrJc6yoR4lT6o8Q&s"
            alt="404"
            className={classes.error404Image}
          />
          <Typography
            color="secondary"
            variant="h6"
            className={classes.error404Text}
          >
            ERROR: Page Not Found!
          </Typography>
        </div>
      </Paper>
    </div>
  )
}

export default NotFoundPage

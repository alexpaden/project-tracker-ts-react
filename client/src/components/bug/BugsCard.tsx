import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchBugsByProjectId,
  selectBugsByProjectId,
  selectBugsState,
} from '../../redux/slices/bugsSlice'
import { RootState } from '../../redux/store'
import BugsTable from './BugsTable'
import BugsActionCard from './BugsActionCard'
import sortBugs from '../../utils/sortBugs'
import filterBugs from '../../utils/filterBugs'
import LoadingSpinner from '../LoadingSpinner'
import InfoText from '../InfoText'
import { Paper, Typography } from '@material-ui/core'
import { useMainPageStyles } from '../../styles/muiStyles'
import BugReportOutlinedIcon from '@material-ui/icons/BugReportOutlined'

interface BugsCardProps {
  projectId: string
  isMobile: boolean
}

const BugsCard = ({ projectId, isMobile }: BugsCardProps) => {
  const classes = useMainPageStyles()
  const dispatch = useDispatch()
  const bugs = useSelector((state: RootState) =>
    selectBugsByProjectId(state, projectId)
  )
  const { fetchLoading, fetchError, sortBy, filterBy } =
    useSelector(selectBugsState)
  const [filterValue, setFilterValue] = useState('')

  useEffect(() => {
    dispatch(fetchBugsByProjectId(projectId))
  }, [dispatch, projectId])

  const filteredSortedBugs =
    bugs &&
    sortBugs(
      bugs.filter(
        (b) =>
          b.title.toLowerCase().includes(filterValue.toLowerCase()) &&
          filterBugs(filterBy, b)
      ),
      sortBy
    )

  const bugsDataToDisplay = () => {
    if (fetchLoading) {
      return (
        <LoadingSpinner
          marginTop={isMobile ? '3em' : '4em'}
          size={isMobile ? 60 : 80}
        />
      )
    } else if (fetchError) {
      return (
        <InfoText
          text={`Error: ${fetchError}`}
          variant={isMobile ? 'h6' : 'h5'}
        />
      )
    } else if (!bugs || bugs.length === 0) {
      return (
        <InfoText text="No Bugs added yet." variant={isMobile ? 'h6' : 'h5'} />
      )
    } else if (!filteredSortedBugs || filteredSortedBugs.length === 0) {
      return (
        <InfoText text="No matches found." variant={isMobile ? 'h6' : 'h5'} />
      )
    } else {
      return (
        <div>
          <BugsTable bugs={filteredSortedBugs} />
        </div>
      )
    }
  }

  return (
    <Paper className={classes.bugsPaper}>
      <Typography
        variant={isMobile ? 'h6' : 'h5'}
        color="secondary"
        className={classes.flexHeader}
      >
        <BugReportOutlinedIcon
          fontSize={isMobile ? 'medium' : 'large'}
          style={{ marginRight: '0.2em' }}
        />
        Bugs
      </Typography>
      <div className={classes.bugsActionCard}>
        <BugsActionCard
          projectId={projectId}
          filterValue={filterValue}
          setFilterValue={setFilterValue}
          isMobile={isMobile}
        />
      </div>
      {bugsDataToDisplay()}
    </Paper>
  )
}

export default BugsCard

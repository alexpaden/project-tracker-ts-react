import { Link as RouterLink } from 'react-router-dom'
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Link,
  Paper,
} from '@material-ui/core'
import '../styles/projects.css'
import { formatDateTime, truncateString } from '../utils/helperFuncs'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  selectProjectsState,
  fetchProjects,
} from '../redux/slices/projectsSlice'
import ProjectsActionCard from '../components/project/ProjActionCard'
import sortProjects from '../utils/sortProjects'

const tableHeaders = ['Name', 'Bugs', 'Added']

const ProjectsPage = () => {
  const { projects, sortBy } = useSelector(selectProjectsState)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchProjects())
  }, [dispatch])

  const [filterValue, setFilterValue] = useState('')

  const filteredSortedProjects = sortProjects(
    projects.filter((p) =>
      p.name.toLowerCase().includes(filterValue.toLowerCase())
    ),
    sortBy
  )

  return (
    <div className="ProjectsPage">
      <span>header here?</span>
      <br />
      <br />
      <ProjectsActionCard
        filterValue={filterValue}
        setFilterValue={setFilterValue}
      />

      <Paper className="MiniTable">
        <Table>
          <TableHead>
            <TableRow>
              {tableHeaders.map((t) => (
                <TableCell key={t} align="center">
                  {t}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredSortedProjects?.map((p) => (
              <TableRow key={p.id}>
                <TableCell align="center">
                  <Link
                    component={RouterLink}
                    to={`/projects/${p.id}`}
                    color="secondary"
                  >
                    {truncateString(p.name, 30)}
                  </Link>
                </TableCell>
                <TableCell align="center">bugs#</TableCell>
                <TableCell align="center">
                  {formatDateTime(p.createdAt)}
                </TableCell>
                <TableCell align="center"></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </div>
  )
}

export default ProjectsPage

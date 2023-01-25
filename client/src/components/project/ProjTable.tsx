import { Link as RouterLink, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { ProjectState } from '../../redux/types'
import { selectAuthState } from '../../redux/slices/authSlice'
import { formatDateTime, truncateString } from '../../utils/helperFuncs'

import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Link,
  Paper,
} from '@material-ui/core'
import { useTableStyles } from '../../styles/muiStyles'
import ProjMenu from './ProjMenu'

const tableHeaders = ['Name', 'Bugs', 'Admin', 'Added', 'Actions']

const ProjectsTable: React.FC<{ projects: ProjectState[] }> = ({
  projects,
}) => {
  const classes = useTableStyles()
  const navigate = useNavigate()
  const { user } = useSelector(selectAuthState)

  return (
    <Paper className={classes.table}>
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
          {projects.map((p) => (
            <TableRow key={p.id}>
              <TableCell
                onClick={() => navigate(`/projects/${p.id}`)}
                className={classes.clickableCell}
                align="center"
              >
                <Link
                  component={RouterLink}
                  to={`/projects/${p.id}`}
                  color="secondary"
                >
                  {truncateString(p.name, 30)}
                </Link>
              </TableCell>
              <TableCell align="center">{p.bugs.length}</TableCell>
              <TableCell align="center">{p.createdBy.username}</TableCell>
              <TableCell align="center">
                {formatDateTime(p.createdAt)}
              </TableCell>
              <TableCell align="center">
                <ProjMenu
                  projectId={p.id}
                  currentName={p.name}
                  isAdmin={p.createdBy.id === user?.id}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  )
}

export default ProjectsTable

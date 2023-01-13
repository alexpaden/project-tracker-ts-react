import { Link as RouterLink } from 'react-router-dom'
import { ProjectState } from '../redux/types'

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

const tableHeaders = ['Name', 'Bugs', 'Added']

const ProjectsTable: React.FC<{ projects: ProjectState[] }> = ({
  projects,
}) => {
  return (
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
          {projects.map((p) => (
            <TableRow key={p.id}>
              <TableCell align="center">
                <Link
                  component={RouterLink}
                  to={`/projects/${p.id}`}
                  color="secondary"
                >
                  {p.name}
                </Link>
              </TableCell>
              <TableCell align="center"></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  )
}

export default ProjectsTable

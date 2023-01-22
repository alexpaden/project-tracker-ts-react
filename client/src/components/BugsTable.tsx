import React from 'react'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import { BugState } from '../redux/types'
import { formatDateTime } from '../utils/helperFuncs'
import { priorityStyles, statusStyles } from '../styles/customStyles'

import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Link,
  Paper,
} from '@material-ui/core'
import { useTableStyles } from '../styles/muiStyles'

const tableHeaders = [
  'Title',
  'Priority',
  'Status',
  'Added',
  'Updated',
  'Notes',
  'Actions',
]

interface BugsTableProps {
  bugs: BugState[]
}

const BugsTable = ({ bugs }: BugsTableProps) => {
  const classes = useTableStyles()
  const navigate = useNavigate()

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
          {bugs.map((b) => (
            <TableRow key={b.id}>
              <TableCell
                align="center"
                onClick={() =>
                  navigate(`/projects/${b.projectId}/bugs/${b.id}`)
                }
                className={classes.clickableCell}
              >
                <Link
                  component={RouterLink}
                  to={`/projects/${b.projectId}/bugs/${b.id}`}
                  color="secondary"
                >
                  {b.title}
                </Link>
              </TableCell>
              <TableCell align="center">
                <div
                  style={{
                    ...priorityStyles(b.priority),
                    textTransform: 'capitalize',
                    margin: '0 auto',
                  }}
                >
                  {b.priority}
                </div>
              </TableCell>
              <TableCell align="center">
                <div
                  style={{
                    ...statusStyles(b.isResolved),
                    margin: '0 auto',
                  }}
                >
                  {b.isResolved ? 'Closed' : 'Open'}
                </div>
              </TableCell>
              <TableCell align="center">
                {formatDateTime(b.createdAt)}
              </TableCell>
              <TableCell align="center">
                {!b.updatedAt || !b.updatedBy
                  ? 'n/a'
                  : `${formatDateTime(b.updatedAt)} ~ ${b.updatedBy}`}
              </TableCell>
              <TableCell align="center">notes#</TableCell>
              <TableCell align="center">Bugs Menu</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  )
}

export default BugsTable

import { useDispatch, useSelector } from 'react-redux'
import FilterBar from './FilterBar'
import SortBar from './SortBar'
import ProjectForm from './ProjectForm'
import { ProjectSortValues } from '../redux/types'
import {
  sortProjectsBy,
  selectProjectsState,
} from '../redux/slices/projectsSlice'

import { useActionCardStyles } from '../styles/muiStyles'
import AddIcon from '@material-ui/icons/Add'

const menuItems = [
  { value: 'newest', label: 'Newest' },
  { value: 'oldest', label: 'Oldest' },
  { value: 'a-z', label: 'Name (A - Z)' },
  { value: 'z-a', label: 'Name (Z - A)' },
  { value: 'most-bugs', label: 'Most Bugs' },
  { value: 'least-bugs', label: 'Least Bugs' },
  { value: 'most-members', label: 'Most Members' },
  { value: 'least-members', label: 'Least Members' },
]

const ProjectsActionCard: React.FC<{
  filterValue: string
  setFilterValue: (filterValue: string) => void
}> = ({ filterValue, setFilterValue }) => {
  const classes = useActionCardStyles()
  const dispatch = useDispatch()
  const { sortBy } = useSelector(selectProjectsState)

  const handleSortChange = (e: React.ChangeEvent<{ value: unknown }>) => {
    const selectedValue = e.target.value as ProjectSortValues
    dispatch(sortProjectsBy(selectedValue))
  }

  return (
    <div>
      <div className={classes.inputs}>
        <div className={classes.searchBarWrapper}>
          <FilterBar
            filterValue={filterValue}
            setFilterValue={setFilterValue}
            label="Projects"
          />
        </div>
        <div className={classes.sortBarWrapper}>
          <SortBar
            sortBy={sortBy}
            handleSortChange={handleSortChange}
            menuItems={menuItems}
            label="Projects"
          />
        </div>
      </div>
      <ProjectForm />
    </div>
  )
}

export default ProjectsActionCard

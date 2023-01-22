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
import FormDialog from './FormDialog'

const menuItems = [
  { value: 'newest', label: 'Newest' },
  { value: 'oldest', label: 'Oldest' },
  { value: 'a-z', label: 'Name (A - Z)' },
  { value: 'z-a', label: 'Name (Z - A)' },
  { value: 'most-bugs', label: 'Most Bugs' },
  { value: 'least-bugs', label: 'Least Bugs' },
]

interface filterProps {
  filterValue: string
  setFilterValue: (value: string) => void
}

const ProjectsActionCard = ({ filterValue, setFilterValue }: filterProps) => {
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
      <FormDialog
        triggerBtn={{
          type: 'normal',
          text: 'Add Project',
          icon: AddIcon,
          size: 'large',
        }}
        title="Add a new project"
      >
        <ProjectForm editMode={null} />
      </FormDialog>
    </div>
  )
}

export default ProjectsActionCard

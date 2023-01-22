import { useForm } from 'react-hook-form'
import { useSelector, useDispatch } from 'react-redux'
import {
  createNewProject,
  editProjectName,
  selectProjectsState,
  clearSubmitProjectError,
} from '../redux/slices/projectsSlice'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { TextField, Button } from '@material-ui/core'
import { useFormStyles } from '../styles/muiStyles'
import ErrorBox from './ErrorBox'

const validationSchema = yup.object({
  name: yup
    .string()
    .required('Required')
    .max(60, 'Must be at most 60 characters'),
})

interface BaseType {
  closeDialog?: () => void
}
interface CreateProject extends BaseType {
  editMode: null
  currentName?: string
  projectId?: string
}

interface EditProjectName extends BaseType {
  editMode: 'name'
  currentName: string
  projectId: string
}

type ProjectFormProps = CreateProject | EditProjectName

const ProjectForm = ({
  closeDialog,
  editMode,
  currentName,
  projectId,
}: ProjectFormProps) => {
  const classes = useFormStyles()
  const dispatch = useDispatch()
  const { submitError, submitLoading } = useSelector(selectProjectsState)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(validationSchema),
    defaultValues: {
      name: currentName || '',
    },
  })

  const handleCreateProject = ({ name }: { name: string }) => {
    dispatch(createNewProject({ name }, closeDialog))
  }

  const handleEditName = ({ name }: { name: string }) => {
    dispatch(editProjectName(projectId as string, name, closeDialog))
  }

  return (
    <form
      onSubmit={handleSubmit(
        editMode === 'name' ? handleEditName : handleCreateProject
      )}
    >
      <TextField
        {...register('name')}
        name="name"
        required
        fullWidth
        type="text"
        label="Project Name"
        variant="outlined"
        error={errors.name ? true : false}
        helperText={errors.name ? errors.name.message : ''}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={submitLoading}
        className={classes.submitBtn}
      >
        {editMode ? 'Edit' : 'Create'}
      </Button>
      {submitError && (
        <ErrorBox
          errorMsg={submitError}
          clearErrorMsg={() => dispatch(clearSubmitProjectError())}
        />
      )}
    </form>
  )
}

export default ProjectForm

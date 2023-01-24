import { useForm, Controller } from 'react-hook-form'
import { useSelector, useDispatch } from 'react-redux'
import {
  createNewBug,
  editBug,
  clearSubmitBugError,
  selectBugsState,
} from '../../redux/slices/bugsSlice'
import { BugPayload } from '../../redux/types'
import ErrorBox from '../ErrorBox'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import {
  TextField,
  RadioGroup,
  Radio,
  FormControlLabel,
  Button,
  InputAdornment,
  FormLabel,
  FormControl,
} from '@material-ui/core'
import { useFormStyles } from '../../styles/muiStyles'
import TitleIcon from '@material-ui/icons/Title'
import SubjectIcon from '@material-ui/icons/Subject'

const validationSchema = yup.object({
  title: yup
    .string()
    .required('Required')
    .min(3, 'Must be at least 3 characters')
    .max(60, 'Must be at most 60 characters'),

  description: yup.string().required('Required'),
})

interface BugFormProps {
  closeDialog?: () => void
  projectId: string
  isEditMode: boolean
  currentData?: BugPayload
  bugId?: string
}

const BugForm = ({
  closeDialog,
  isEditMode,
  projectId,
  currentData,
  bugId,
}: BugFormProps) => {
  const classes = useFormStyles()
  const dispatch = useDispatch()
  const { submitError, submitLoading } = useSelector(selectBugsState)
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(validationSchema),
    defaultValues: {
      title: currentData?.title || '',
      description: currentData?.description || '',
      priority: currentData?.priority || 'low',
    },
  })

  const handleCreateBug = (data: BugPayload) => {
    dispatch(createNewBug(projectId, data, closeDialog))
  }

  const handleUpdateBug = (data: BugPayload) => {
    dispatch(editBug(projectId, bugId as string, data, closeDialog))
  }

  return (
    <form
      onSubmit={handleSubmit(isEditMode ? handleUpdateBug : handleCreateBug)}
    >
      <TextField
        {...register('title')}
        name="title"
        required
        fullWidth
        type="text"
        label="Bug Title"
        variant="outlined"
        error={'title' in errors}
        helperText={'title' in errors ? errors.title?.message : ''}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <TitleIcon color="primary" />
            </InputAdornment>
          ),
        }}
      />
      <TextField
        className={classes.fieldMargin}
        multiline
        minRows={1}
        maxRows={4}
        {...register('description')}
        name="description"
        required
        fullWidth
        type="text"
        label="Description"
        variant="outlined"
        error={'description' in errors}
        helperText={'description' in errors ? errors.description?.message : ''}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SubjectIcon color="primary" />
            </InputAdornment>
          ),
        }}
      />
      <Controller
        control={control}
        name="priority"
        defaultValue={currentData?.priority || 'low'}
        render={({ field }) => (
          <FormControl className={classes.fieldMargin}>
            <FormLabel component="legend">Priority</FormLabel>
            <RadioGroup aria-label="priority" {...field}>
              <FormControlLabel value="low" control={<Radio />} label="Low" />
              <FormControlLabel
                value="medium"
                control={<Radio />}
                label="Medium"
              />
              <FormControlLabel value="high" control={<Radio />} label="High" />
            </RadioGroup>
          </FormControl>
        )}
      />
      <Button
        className={classes.submitBtn}
        type="submit"
        variant="contained"
        color="primary"
        disabled={submitLoading}
      >
        {isEditMode ? 'Update Bug' : 'Create Bug'}
      </Button>
      {submitError && (
        <ErrorBox
          errorMsg={submitError}
          clearErrorMsg={() => dispatch(clearSubmitBugError())}
        />
      )}
    </form>
  )
}

export default BugForm

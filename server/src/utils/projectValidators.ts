interface ProjectErrors {
  name?: string
  members?: string
}

interface BugErrors {
  title?: string
  description?: string
  priority?: string
}

export const projectNameError = (name: string) => {
  if (!name || name.trim() === '' || name.length > 60) {
    return 'Project name length must not be more than 60.'
  }
}

export const createProjectValidator = (name: string) => {
  const errors: ProjectErrors = {}
  const nameError = projectNameError(name)

  if (nameError) {
    errors.name = nameError
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  }
}

export const createBugValidator = (
  title: string,
  description: string,
  priority: string
) => {
  const errors: BugErrors = {}
  const validPriorities = ['low', 'medium', 'high']

  if (!title || title.trim() === '' || title.length > 60 || title.length < 3) {
    errors.title = 'Title must be in range of 3-60 characters length.'
  }

  if (!description || description.trim() === '') {
    errors.description = 'Description field must not be empty.'
  }

  if (!priority || !validPriorities.includes(priority)) {
    errors.priority = 'Priority can only be - low, medium or high.'
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  }
}

import { Request, Response } from 'express'
import { Project } from '../entity/Project'
import { Bug } from '../entity/Bug'
import {
  createProjectValidator,
  projectNameError,
} from '../utils/projectValidators'

const fieldsToSelect = [
  'project.id',
  'project.name',
  'project.createdAt',
  'project.updatedAt',
  'createdBy.id',
  'createdBy.username',
  'bug.id',
]

export const getProjects = async (_req: Request, res: Response) => {
  const projects = await Project.createQueryBuilder('project')
    .leftJoinAndSelect('project.createdBy', 'createdBy')
    .leftJoinAndSelect('project.bugs', 'bug')
    .select(fieldsToSelect)
    .getMany()

  res.json(projects)
}

export const createProject = async (req: Request, res: Response) => {
  const { name } = req.body

  const { errors, valid } = createProjectValidator(name)

  if (!valid) {
    return res.status(400).send({ message: Object.values(errors)[0] })
  }

  const newProject = Project.create({
    name,
    createdById: req.user,
  })

  await newProject.save()

  res.status(201).json(newProject)
}

export const editProject = async (req: Request, res: Response) => {
  const { name } = req.body
  const { projectId } = req.params

  const nameValidationError = projectNameError(name)

  if (nameValidationError) {
    return res.status(400).send({ message: nameValidationError })
  }

  const targetProject = await Project.findOneBy({ id: projectId })

  if (!targetProject) {
    return res.status(404).send({ message: 'Invalid project ID.' })
  }

  if (targetProject.createdById !== req.user) {
    return res.status(401).send({ message: 'Access is denied.' })
  }

  targetProject.name = name
  await targetProject.save()
  res.json(targetProject)
}

export const deleteProject = async (req: Request, res: Response) => {
  const { projectId } = req.params

  const targetProject = await Project.findOneBy({ id: projectId })

  if (!targetProject) {
    return res.status(404).send({ message: 'Invalid project ID.' })
  }

  if (targetProject.createdById !== req.user) {
    return res.status(401).send({ message: 'Access is denied.' })
  }

  await Bug.delete({ projectId })
  await targetProject.remove()
  res.status(204).end()
}

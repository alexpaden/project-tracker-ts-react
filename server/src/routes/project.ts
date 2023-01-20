import express from 'express'
import {
  getProjects,
  createProject,
  editProject,
  deleteProject,
} from '../controllers/project'
import { getBugs, createBug, updateBug, deleteBug } from '../controllers/bug'
import { getNotes, postNote, deleteNote, updateNote } from '../controllers/note'
import authChecker from '../middleware/authChecker'

const router = express.Router()

// Project routes
router.get('/', getProjects)
router.post('/', authChecker, createProject)
router.put('/:id', authChecker, editProject)
router.delete('/:id', authChecker, deleteProject)

// Project bug routes
router.get('/:projectId/bugs', authChecker, getBugs)
router.post('/:projectId/bugs', authChecker, createBug)
router.put('/:projectId/bugs/:bugId', authChecker, updateBug)
router.delete('/:projectId/bugs/:bugId', authChecker, deleteBug)

// Project note routes
router.get('/:projectId/bugs/:bugId/notes', getNotes)
router.post('/:projectId/bugs/:bugId/notes', postNote)
router.delete('/:projectId/bugs/:bugId/notes/:noteId', deleteNote)
router.put('/:projectId/bugs/:bugId/notes/:noteId', updateNote)

export default router

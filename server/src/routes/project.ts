import express from 'express'
import {
  getProjects,
  createProject,
  editProject,
  deleteProject,
} from '../controllers/project'
import {
  getBugs,
  createBug,
  updateBug,
  deleteBug,
  closeBug,
  reopenBug,
} from '../controllers/bug'
import { getNotes, postNote, deleteNote, updateNote } from '../controllers/note'
import authChecker from '../middleware/authChecker'

const router = express.Router()

// Project routes
router.get('/', getProjects)
router.post('/', authChecker, createProject)
router.put('/:projectId', authChecker, editProject)
router.delete('/:projectId', authChecker, deleteProject)

// Project bug routes
router.get('/:projectId/bugs', getBugs)
router.post('/:projectId/bugs', authChecker, createBug)
router.put('/:projectId/bugs/:bugId', authChecker, updateBug)
router.delete('/:projectId/bugs/:bugId', authChecker, deleteBug)
router.post('/:projectId/bugs/:bugId/close', authChecker, closeBug)
router.post('/:projectId/bugs/:bugId/reopen', authChecker, reopenBug)

// Project note routes
router.get('/:projectId/bugs/:bugId/notes', getNotes)
router.post('/:projectId/bugs/:bugId/notes', authChecker, postNote)
router.delete('/:projectId/bugs/:bugId/notes/:noteId', authChecker, deleteNote)
router.put('/:projectId/bugs/:bugId/notes/:noteId', authChecker, updateNote)

export default router

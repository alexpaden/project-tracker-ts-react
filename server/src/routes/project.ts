import express from 'express';
import { getProjects, createProject, editProject, deleteProject } from '../controllers/project';
import { getBugs, createBug, updateBug, deleteBug } from '../controllers/bug';
import { getNotes, postNote, deleteNote, updateNote } from '../controllers/note';


const router = express.Router();

// Project routes
router.get('/', getProjects);
router.post('/', createProject);
router.put('/:id', editProject);
router.delete('/:id', deleteProject);

// Project bug routes
router.get('/:projectId/bugs', getBugs);
router.post('/:projectId/bugs', createBug);
router.put('/:projectId/bugs/:bugId', updateBug);
router.delete('/:projectId/bugs/:bugId', deleteBug);

// Project note routes
router.get('/:projectId/bugs/:bugId/notes', getNotes);
router.post('/:projectId/bugs/:bugId/notes', postNote);
router.delete('/:projectId/notes/:noteId', deleteNote);
router.put('/:projectId/notes/:noteId', updateNote);

export default router;
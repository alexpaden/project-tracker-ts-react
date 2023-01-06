import express from 'express';
import { getProjects, createProject, editProject, deleteProject } from '../controllers/project';
import { getBugs, createBug, updateBug, deleteBug } from '../controllers/bug';

const router = express.Router();

router.get('/', getProjects);
router.post('/', createProject);
router.put('/:id', editProject);
router.delete('/:id', deleteProject);

router.get('/:projectId/bugs', getBugs);
router.post('/:projectId/bugs', createBug);
router.put('/:projectId/bugs/:bugId', updateBug);
router.delete('/:projectId/bugs/:bugId', deleteBug);

export default router;
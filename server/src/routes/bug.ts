import express from 'express';
import { getBugs, createBug, updateBug, deleteBug } from '../controllers/bug';

const router = express.Router();

router.get('/:projectId/bugs', getBugs);
router.post('/:projectId/bugs', createBug);
router.put('/:projectId/bugs/:bugId', updateBug);
router.delete('/:projectId/bugs/:bugId', deleteBug);

export default router;
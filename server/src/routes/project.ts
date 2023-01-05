import express from 'express';
import {
    getProjects,
    createProject,
} from '../controllers/project';

const router = express.Router();

router.get('/', getProjects);
router.post('/', createProject);

export default router;
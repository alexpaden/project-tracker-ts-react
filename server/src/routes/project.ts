import express from 'express';
import {
    getProjects,
    createProject,
    editProject,
    deleteProject
} from '../controllers/project';

const router = express.Router();

router.get('/', getProjects);
router.post('/', createProject);
router.put('/:id', editProject);
router.delete('/:id', deleteProject);

export default router;
import { Request, Response } from 'express';
import { Project } from '../entity/Project';

const fieldsToSelect = [
    'project.id',
    'project.name',
    'project.createdAt',
    'project.updatedAt',
];

export const getProjects = async (_req: Request, res: Response) => {
    const projects = await Project.createQueryBuilder('project')
    .select(fieldsToSelect)
    .getMany();

    res.json(projects);
};

export const createProject = async (req: Request, res: Response) => {
    const { name } = req.body;
    
    const newProject = Project.create({
        name,
    });

    await newProject.save();

    res.json(newProject);
};
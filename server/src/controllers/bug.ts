import { Request, Response } from "express";
import { Bug } from "../entity/Bug";
import { Project } from "../entity/Project";

const fieldsToSelect = [
  "bug.id",
  "bug.projectId",
  "bug.title",
  "bug.description",
];

export const getBugs = async (req: Request, res: Response) => {
  const { projectId } = req.params;
  const bugs = await Bug.createQueryBuilder("bug")
    .where('"projectId" = :projectId', { projectId })
    .select(fieldsToSelect)
    .getMany();

  res.json(bugs);
};

export const createBug = async (req: Request, res: Response) => {
  const { title, description } = req.body;
  const { projectId } = req.params;
  const newBug = Bug.create({
    title,
    description,
    projectId,
  });

  await newBug.save();

  return res.status(201).json(newBug);
};

export const updateBug = async (req: Request, res: Response) => {
  const { title, description } = req.body;
  const { bugId } = req.params;
  const targetBug = await Bug.findOneBy({ id: bugId });

  if (!targetBug) {
    return res.status(400).send({ message: "Invalid bug ID." });
  }

  targetBug.title = title;
  targetBug.description = description;

  await targetBug.save();

  return res.status(201).json(targetBug);
};

export const deleteBug = async (req: Request, res: Response) => {
  const { projectId, bugId } = req.params;
  const targetProject = await Project.findOneBy({
    id: projectId,
  });

  if (!targetProject) {
    return res.status(404).send({ message: "Invalid project ID." });
  }

  const targetBug = await Bug.findOneBy({ id: bugId });

  if (!targetBug) {
    return res.status(404).send({ message: "Invalid bug ID." });
  }

  await targetBug.remove();
  res.status(204).end();
};

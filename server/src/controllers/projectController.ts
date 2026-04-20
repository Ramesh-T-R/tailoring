import { Request, Response } from 'express';
import Project from '../models/Project';
import { ProjectSchema } from '../schemas/projectSchema';

export const getProjects = async (req: Request, res: Response) => {
  try {
    const projects = await Project.find().sort({ updatedAt: -1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching projects', error });
  }
};

export const createProject = async (req: Request, res: Response) => {
  try {
    const validatedData = ProjectSchema.parse(req.body);
    const newProject = new Project(validatedData);
    const savedProject = await newProject.save();
    res.status(201).json(savedProject);
  } catch (error) {
    res.status(400).json({ message: 'Validation or Database Error', error });
  }
};

export const updateProject = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const validatedData = ProjectSchema.partial().parse(req.body);
    const updatedProject = await Project.findOneAndUpdate(
      { id },
      { $set: validatedData },
      { new: true, upsert: true }
    );
    res.json(updatedProject);
  } catch (error) {
    res.status(400).json({ message: 'Validation or Database Error', error });
  }
};

export const deleteProject = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await Project.findOneAndDelete({ id });
    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting project', error });
  }
};

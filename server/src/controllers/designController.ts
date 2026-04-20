import { Request, Response } from 'express';
import Design from '../models/Design';
import { DesignSchema } from '../schemas/designSchema';

export const getDesigns = async (req: Request, res: Response) => {
  try {
    const designs = await Design.find().populate('category').sort({ name: 1 });
    res.json(designs);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching designs', error });
  }
};

export const createDesign = async (req: Request, res: Response) => {
  try {
    const validatedData = DesignSchema.parse(req.body);
    const newDesign = new Design(validatedData);
    const saved = await newDesign.save();
    const populated = await saved.populate('category');
    res.status(201).json(populated);
  } catch (error) {
    res.status(400).json({ message: 'Validation or Database Error', error });
  }
};

export const updateDesign = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const validatedData = DesignSchema.partial().parse(req.body);
    const updated = await Design.findByIdAndUpdate(id, validatedData, { new: true }).populate('category');
    if (!updated) return res.status(404).json({ message: 'Design not found' });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: 'Validation or Database Error', error });
  }
};

export const deleteDesign = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleted = await Design.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: 'Design not found' });
    res.json({ message: 'Design deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting design', error });
  }
};

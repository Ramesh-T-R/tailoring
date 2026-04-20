import { Request, Response } from 'express';
import DesignCategory from '../models/DesignCategory';
import { DesignCategorySchema } from '../schemas/designCategorySchema';

export const getDesignCategories = async (req: Request, res: Response) => {
  try {
    const categories = await DesignCategory.find().sort({ name: 1 });
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching design categories', error });
  }
};

export const createDesignCategory = async (req: Request, res: Response) => {
  try {
    const validatedData = DesignCategorySchema.parse(req.body);
    const newCategory = new DesignCategory(validatedData);
    const saved = await newCategory.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ message: 'Validation or Database Error', error });
  }
};

export const updateDesignCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const validatedData = DesignCategorySchema.partial().parse(req.body);
    const updated = await DesignCategory.findByIdAndUpdate(id, validatedData, { new: true });
    if (!updated) {
      return res.status(404).json({ message: 'Design category not found' });
    }
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: 'Validation or Database Error', error });
  }
};

export const deleteDesignCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleted = await DesignCategory.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: 'Design category not found' });
    }
    res.json({ message: 'Design category deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting design category', error });
  }
};

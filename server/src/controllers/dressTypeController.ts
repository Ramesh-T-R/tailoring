import { Request, Response } from 'express';
import DressType from '../models/DressType';

export const getDressTypes = async (req: Request, res: Response) => {
  try {
    const types = await DressType.find().populate('sizeChartId').sort({ updatedAt: -1 });
    res.json(types);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching dress types', error });
  }
};

export const createDressType = async (req: Request, res: Response) => {
  try {
    const newType = new DressType(req.body);
    const savedType = await newType.save();
    const populated = await savedType.populate('sizeChartId');
    res.status(201).json(populated);
  } catch (error) {
    res.status(400).json({ message: 'Error creating dress type', error });
  }
};

export const updateDressType = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedType = await DressType.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    ).populate('sizeChartId');
    res.json(updatedType);
  } catch (error) {
    res.status(400).json({ message: 'Error updating dress type', error });
  }
};

export const deleteDressType = async (req: Request, res: Response) => {
  try {
    await DressType.findByIdAndDelete(req.params.id);
    res.json({ message: 'Dress type deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting dress type', error });
  }
};

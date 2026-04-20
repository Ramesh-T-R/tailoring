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

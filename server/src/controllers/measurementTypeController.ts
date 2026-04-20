import { Request, Response } from 'express';
import MeasurementType from '../models/MeasurementType';

export const getMeasurementTypes = async (req: Request, res: Response) => {
  try {
    const types = await MeasurementType.find().sort({ name: 1 });
    res.json(types);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching measurement types', error });
  }
};

export const createMeasurementType = async (req: Request, res: Response) => {
  try {
    const newType = new MeasurementType(req.body);
    const savedType = await newType.save();
    res.status(201).json(savedType);
  } catch (error) {
    res.status(400).json({ message: 'Error creating measurement type', error });
  }
};

export const updateMeasurementType = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedType = await MeasurementType.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );
    res.json(updatedType);
  } catch (error) {
    res.status(400).json({ message: 'Error updating measurement type', error });
  }
};

export const deleteMeasurementType = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await MeasurementType.findByIdAndDelete(id);
    res.json({ message: 'Measurement type deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting measurement type', error });
  }
};

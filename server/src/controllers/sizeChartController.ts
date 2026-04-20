import { Request, Response } from 'express';
import SizeChart from '../models/SizeChart';

export const getSizeCharts = async (req: Request, res: Response) => {
  try {
    const charts = await SizeChart.find()
      .populate('entries.sizeTypeId')
      .populate('entries.measurementTypeId')
      .sort({ updatedAt: -1 });
    res.json(charts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching size charts', error });
  }
};

export const createSizeChart = async (req: Request, res: Response) => {
  try {
    const newChart = new SizeChart(req.body);
    const savedChart = await newChart.save();
    const populated = await savedChart.populate(['entries.sizeTypeId', 'entries.measurementTypeId']);
    res.status(201).json(populated);
  } catch (error) {
    res.status(400).json({ message: 'Error creating size chart', error });
  }
};

export const getSizeChartById = async (req: Request, res: Response) => {
  try {
    const chart = await SizeChart.findById(req.params.id)
      .populate(['entries.sizeTypeId', 'entries.measurementTypeId']);
    if (!chart) return res.status(404).json({ message: 'Chart not found' });
    res.json(chart);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching chart', error });
  }
};

export const updateSizeChart = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedChart = await SizeChart.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    ).populate(['entries.sizeTypeId', 'entries.measurementTypeId']);
    res.json(updatedChart);
  } catch (error) {
    res.status(400).json({ message: 'Error updating size chart', error });
  }
};

export const deleteSizeChart = async (req: Request, res: Response) => {
  try {
    await SizeChart.findByIdAndDelete(req.params.id);
    res.json({ message: 'Size chart deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting size chart', error });
  }
};

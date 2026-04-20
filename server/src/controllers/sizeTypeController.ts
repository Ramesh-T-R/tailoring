import { Request, Response } from 'express';
import SizeType from '../models/SizeType';

export const getSizeTypes = async (req: Request, res: Response) => {
  try {
    const types = await SizeType.find();
    if (types.length === 0) {
      // Seed if empty
      const defaultTypes = ['S', 'M', 'L', 'XL', 'XXL', 'XXXL'];
      const seeded = await SizeType.insertMany(defaultTypes.map(name => ({ name })));
      return res.json(seeded);
    }
    res.json(types);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching size types', error });
  }
};

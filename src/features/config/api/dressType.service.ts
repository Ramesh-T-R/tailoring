import { DressType } from '../types/dressType';

const API_URL = 'http://localhost:5001/api/dress-types';

export const dressTypeService = {
  async getAll(): Promise<DressType[]> {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('Failed to fetch dress types');
    return response.json();
  },

  async create(data: Omit<DressType, '_id'>): Promise<DressType> {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to create dress type');
    return response.json();
  }
};

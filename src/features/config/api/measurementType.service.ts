import { MeasurementType } from '../types/measurementType';

const API_URL = `${import.meta.env.VITE_API_BASE_URL}/measurement-types`;

export const measurementTypeService = {
  async getAll(): Promise<MeasurementType[]> {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('Failed to fetch measurement types');
    return response.json();
  },

  async create(data: Omit<MeasurementType, '_id'>): Promise<MeasurementType> {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to create measurement type');
    return response.json();
  },

  async update(id: string, data: Partial<MeasurementType>): Promise<MeasurementType> {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to update measurement type');
    return response.json();
  },

  async delete(id: string): Promise<void> {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete measurement type');
  }
};

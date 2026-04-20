import { SizeType, SizeChart } from '../types/sizeChart';

const API_URL = `${import.meta.env.VITE_API_BASE_URL}/size-charts`;

export const sizeChartService = {
  async getSizeTypes(): Promise<SizeType[]> {
    const response = await fetch(`${API_URL}/types`);
    if (!response.ok) throw new Error('Failed to fetch size types');
    return response.json();
  },

  async getAll(): Promise<SizeChart[]> {
    const response = await fetch(`${API_URL}/charts`);
    if (!response.ok) throw new Error('Failed to fetch size charts');
    return response.json();
  },

  async create(data: Omit<SizeChart, '_id'>): Promise<SizeChart> {
    const response = await fetch(`${API_URL}/charts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to create size chart');
    return response.json();
  },

  async update(id: string, data: Omit<SizeChart, '_id'>): Promise<SizeChart> {
    const response = await fetch(`${API_URL}/charts/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to update size chart');
    return response.json();
  },

  async delete(id: string): Promise<void> {
    const response = await fetch(`${API_URL}/charts/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete size chart');
  }
};

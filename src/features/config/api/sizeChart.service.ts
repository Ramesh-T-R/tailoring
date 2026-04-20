import { SizeType, SizeChart } from '../types/sizeChart';

const API_URL = 'http://localhost:5001/api/size-charts';

export const sizeChartService = {
  async getSizeTypes(): Promise<SizeType[]> {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('Failed to fetch size types');
    return response.json();
  },

  async create(data: Omit<SizeChart, '_id'>): Promise<SizeChart> {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to create size chart');
    return response.json();
  },

  async update(id: string, data: Omit<SizeChart, '_id'>): Promise<SizeChart> {
    const response = await fetch(`${API_URL}/size-charts/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to update size chart');
    return response.json();
  },

  async delete(id: string): Promise<void> {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete size chart');
  }
};

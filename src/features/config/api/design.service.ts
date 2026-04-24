import { IDesign } from '../types/design';

const API_URL = `${import.meta.env.VITE_API_BASE_URL}/designs`;

export const designService = {
  async getAll(): Promise<IDesign[]> {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('Failed to fetch designs');
    return response.json();
  },

  async create(data: Omit<IDesign, '_id'>): Promise<IDesign> {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to create design');
    return response.json();
  },

  async update(id: string, data: Partial<IDesign>): Promise<IDesign> {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to update design');
    return response.json();
  },

  async delete(id: string): Promise<void> {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete design');
  }
};

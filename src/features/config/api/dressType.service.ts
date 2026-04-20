import { DressType } from '../types/dressType';

const API_URL = `${import.meta.env.VITE_API_BASE_URL}/dress-types`;

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
  },

  async update(id: string, data: Omit<DressType, '_id'>): Promise<DressType> {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to update dress type');
    return response.json();
  },

  async delete(id: string): Promise<void> {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete dress type');
  }
};

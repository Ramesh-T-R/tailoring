import { DesignCategory } from '../types/designCategory';

const API_URL = `${import.meta.env.VITE_API_BASE_URL}/design-categories`;

export const designCategoryService = {
  async getAll(): Promise<DesignCategory[]> {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('Failed to fetch design categories');
    return response.json();
  },

  async create(data: Omit<DesignCategory, '_id'>): Promise<DesignCategory> {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to create design category');
    return response.json();
  },

  async update(id: string, data: Omit<DesignCategory, '_id'>): Promise<DesignCategory> {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to update design category');
    return response.json();
  },

  async delete(id: string): Promise<void> {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete design category');
  }
};

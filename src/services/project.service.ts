import { ProjectState } from '../types/project';

const API_URL = `${import.meta.env.VITE_API_BASE_URL}/projects`;

export const projectService = {
  async getAll(): Promise<ProjectState[]> {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('Failed to fetch projects');
    return response.json();
  },

  async create(project: ProjectState): Promise<ProjectState> {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(project),
    });
    if (!response.ok) throw new Error('Failed to create project');
    return response.json();
  },

  async update(id: string, project: Partial<ProjectState>): Promise<ProjectState> {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(project),
    });
    if (!response.ok) throw new Error('Failed to update project');
    return response.json();
  },

  async delete(id: string): Promise<void> {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete project');
  }
};

import { useState, useEffect } from 'react';
import { ProjectState, Gender } from '../../../types/project';
import { FabricExpert } from '../../../utils/fabricExpert';
import { projectService } from '../../../services/project.service';

import { DressType } from '../../config/types/dressType';

export type AppView = 'home' | 'setup' | 'studio' | 'config-measurements' | 'config-sizes' | 'config-dresses' | 'config-parts' | 'designs' | 'config-dress-edit';

export const useAppLogic = () => {
  const [view, setView] = useState<AppView>('home');
  const [projects, setProjects] = useState<ProjectState[]>([]);
  const [currentProject, setCurrentProject] = useState<ProjectState | null>(null);
  const [currentEditingDressType, setCurrentEditingDressType] = useState<DressType | null>(null);

  const loadProjects = async () => {
    try {
      const data = await projectService.getAll();
      setProjects(data);
    } catch (error) {
      console.error('Error loading projects:', error);
    }
  };

  // Load projects from API on mount
  useEffect(() => {
    loadProjects();
  }, []);

  const handleCreateNew = () => setView('setup');

  const handleGenerate = async (config: any) => {
    const isUpdate = !!config.id;
    
    const projectData: any = {
      name: config.name,
      customerName: 'Customer', 
      gender: config.gender,
      dressType: config.dressType,
      selectedDesignCombinations: config.selectedDesignCombinations,
      sizeTypeId: config.sizeTypeId,
      measurements: config.measurements,
      fabric: {
        type: 'Linen',
        weight: 'Medium',
        stretch: 0,
        recommendedNeedle: '80/12',
        recommendedFoot: 'Standard',
        recommendedThread: 'All-purpose'
      },
      pieces: [
        { id: 'p_front', name: 'Front Panel', points: [{x:0, y:0}, {x:10, y:0}, {x:10, y:20}, {x:0, y:20}], seamAllowance: 1.5, grainLineAngle: 0 },
        { id: 'p_back', name: 'Back Panel', points: [{x:0, y:0}, {x:10, y:0}, {x:10, y:20}, {x:0, y:20}], seamAllowance: 1.5, grainLineAngle: 0 }
      ],
      version: isUpdate ? undefined : 1, // Let backend handle version for updates if needed
    };

    try {
      if (isUpdate) {
        await projectService.update(config.id, projectData);
      } else {
        const newProject: ProjectState = {
          ...projectData,
          id: `proj_${Date.now()}`,
          version: 1,
        };
        await projectService.create(newProject);
      }
      await loadProjects();
      setView('home');
    } catch (error) {
      console.error('Error saving project:', error);
    }
  };

  const handleEditProject = (project: ProjectState) => {
    setCurrentProject(project);
    setView('studio');
  };

  const handleDeleteProject = async (id: string) => {
    try {
      await projectService.delete(id);
      await loadProjects();
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };

  const handleNavigate = (v: string) => {
    setView(v as AppView);
  };

  const handleEditDressType = (dressType: DressType | null) => {
    setCurrentEditingDressType(dressType);
    setView('config-dress-edit');
  };

  return {
    view,
    setView,
    projects,
    currentProject,
    currentEditingDressType,
    handleCreateNew,
    handleGenerate,
    handleEditProject,
    handleDeleteProject,
    handleNavigate,
    handleEditDressType,
    loadProjects
  };
};

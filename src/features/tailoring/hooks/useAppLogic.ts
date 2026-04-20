import { useState, useEffect } from 'react';
import { ProjectState, Gender } from '../../../types/project';
import { FabricExpert } from '../../../utils/fabricExpert';
import { projectService } from '../../../services/project.service';

export type AppView = 'home' | 'setup' | 'studio' | 'config-measurements' | 'config-sizes' | 'config-dresses' | 'config-parts';

export const useAppLogic = () => {
  const [view, setView] = useState<AppView>('home');
  const [projects, setProjects] = useState<ProjectState[]>([]);
  const [currentProject, setCurrentProject] = useState<ProjectState | null>(null);

  // Load projects from API on mount
  useEffect(() => {
    const loadProjects = async () => {
      try {
        const data = await projectService.getAll();
        setProjects(data);
      } catch (error) {
        console.error('Error loading projects:', error);
      }
    };
    loadProjects();
  }, []);

  const handleCreateNew = () => setView('setup');

  const handleGenerate = async (config: { gender: Gender, dressType: string, size: string }) => {
    const newProject: ProjectState = {
      id: `proj_${Date.now()}`,
      name: `${config.size} ${config.dressType}`,
      customerName: 'New Customer',
      gender: config.gender,
      dressType: config.dressType,
      measurements: {
        gender: config.gender,
        height: 180,
        chest: config.size === 'L' ? 110 : config.size === 'M' ? 100 : 90,
        waist: config.size === 'L' ? 95 : config.size === 'M' ? 85 : 75,
        hips: 105,
        shoulderWidth: 46,
        armLength: 62,
        neckCircumference: 42,
      },
      fabric: {
        type: 'Linen',
        weight: 'Medium',
        stretch: 0,
        ...FabricExpert.getRecommendations('Linen'),
      } as any,
      pieces: [
        { id: 'p_front', name: 'Front Panel', points: [], seamAllowance: 1.5, grainLineAngle: 0 },
        { id: 'p_back', name: 'Back Panel', points: [], seamAllowance: 1.5, grainLineAngle: 0 }
      ],
      version: 1,
    };

    try {
      const savedProject = await projectService.create(newProject);
      setProjects([savedProject, ...projects]);
      setCurrentProject(savedProject);
      setView('studio');
    } catch (error) {
      console.error('Error saving project:', error);
    }
  };

  const handleOpenProject = (project: ProjectState) => {
    setCurrentProject(project);
    setView('studio');
  };

  const handleNavigate = (v: string) => {
    setView(v as AppView);
  };

  return {
    view,
    setView,
    projects,
    currentProject,
    handleCreateNew,
    handleGenerate,
    handleOpenProject,
    handleNavigate,
  };
};

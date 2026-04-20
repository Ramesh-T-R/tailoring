import React, { useState, useCallback, useRef } from 'react';
import { ProjectState, MeasurementProfile } from '../../../types/project';
import { StoreManager } from '../../../store/projectStore';
import { MeasurementForm } from '../../../components/MeasurementForm';
import { StitchToolkit } from '../../../components/StitchToolkit';
import { FabricExpert } from '../../../utils/fabricExpert';
import { PatternCanvas } from '../../visualization/components/PatternCanvas';
import { ThreeScene } from '../../visualization/components/ThreeScene';
import { 
  Box, Grid, Card, Typography, Icon, IconButton, 
  Select, MenuItem, FormControl, Button, Divider
} from '@mui/material';
import { Dashboard, DesignServices, Settings, Undo, ArrowBack } from '@mui/icons-material';

import { projectService } from '../../../services/project.service';

interface Props {
  initialProject: ProjectState;
  onExit: () => void;
}

export const ProjectDashboard: React.FC<Props> = ({ initialProject, onExit }) => {
  const [store] = useState(() => new StoreManager(initialProject));
  const [currentProject, setCurrentProject] = useState<ProjectState>(store.getState().project);
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const syncWithServer = useCallback(async (project: ProjectState) => {
    try {
      await projectService.update(project.id, project);
    } catch (error) {
      console.error('Failed to sync with server:', error);
    }
  }, []);

  const handleUpdateMeasurements = (measurements: MeasurementProfile) => {
    // 1. Immediate local update for UI responsiveness
    store.getState().updateMeasurements(measurements);
    const updated = { ...store.getState().project };
    setCurrentProject(updated);

    // 2. Debounced server sync
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    debounceTimer.current = setTimeout(() => {
      syncWithServer(updated);
    }, 500);
  };

  const handleFabricChange = async (fabricType: string) => {
    const recommendations = FabricExpert.getRecommendations(fabricType);
    const updatedProject = {
      ...currentProject,
      fabric: { ...currentProject.fabric, type: fabricType, ...recommendations } as any
    };
    store.getState().project = updatedProject;
    setCurrentProject(updatedProject);
    try {
      await projectService.update(updatedProject.id, updatedProject);
    } catch (error) {
      console.error('Failed to sync fabric change:', error);
    }
  };

  const handleUndo = async () => {
    store.getState().undo();
    const updated = { ...store.getState().project };
    setCurrentProject(updated);
    try {
      await projectService.update(updated.id, updated);
    } catch (error) {
      console.error('Failed to sync undo:', error);
    }
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh', bgcolor: '#f0f2f5', overflow: 'hidden' }}>
      {/* Sidenav - Material Dashboard 2 Signature Look */}
      <Box sx={{ 
        width: 250, 
        bgcolor: '#1a1c23', 
        m: 2, 
        borderRadius: 3, 
        p: 2, 
        display: { xs: 'none', lg: 'flex' },
        flexDirection: 'column',
        boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
        backgroundImage: 'linear-gradient(195deg, #42424a, #191919)'
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 2, mb: 4 }}>
          <Icon sx={{ color: '#fff' }}><DesignServices /></Icon>
          <Typography variant="h6" sx={{ color: '#fff', fontWeight: 600 }}>Tailor Guild</Typography>
        </Box>
        <Divider sx={{ bgcolor: 'rgba(255,255,255,0.1)', mb: 2 }} />
        
        <Box sx={{ flex: 1 }}>
          {[
            { label: 'Dashboard', icon: <Dashboard />, active: true },
            { label: 'Studio', icon: <DesignServices />, active: false },
            { label: 'Settings', icon: <Settings />, active: false },
          ].map((item) => (
            <Box key={item.label} sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 2, 
              p: 1.5, 
              mb: 1,
              borderRadius: 1,
              bgcolor: item.active ? 'primary.main' : 'transparent',
              color: '#fff',
              cursor: 'pointer',
              '&:hover': { bgcolor: item.active ? 'primary.main' : 'rgba(255,255,255,0.05)' }
            }}>
              <Icon fontSize="small">{item.icon}</Icon>
              <Typography variant="body2" sx={{ fontWeight: item.active ? 600 : 400 }}>{item.label}</Typography>
            </Box>
          ))}
        </Box>

        <Button variant="contained" fullWidth sx={{ bgcolor: '#4caf50', mt: 'auto', '&:hover': { bgcolor: '#43a047' } }}>
          Documentation
        </Button>
      </Box>

      {/* Main Content Area */}
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', p: 3, overflowY: 'auto' }}>
        {/* Navbar */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Box>
            <Typography variant="body2" color="textSecondary" sx={{ mb: 0.5 }}>
              Pages / Dashboard
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>{currentProject.name}</Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <IconButton onClick={handleUndo} size="small" sx={{ bgcolor: '#fff', boxShadow: 1 }}>
              <Undo />
            </IconButton>
            <Button 
              variant="contained" 
              startIcon={<ArrowBack />} 
              onClick={onExit}
              sx={{ bgcolor: '#fff', color: '#000', '&:hover': { bgcolor: '#f8f9fa' } }}
            >
              Back
            </Button>
          </Box>
        </Box>

        {/* Dashboard Grid */}
        <Grid container spacing={3}>
          {/* 3D Visualizer Card */}
          <Grid size={{ xs: 12, lg: 7 }}>
            <Card sx={{ position: 'relative', pt: 2, overflow: 'visible' }}>
              <Box sx={{ 
                position: 'absolute', 
                top: -24, 
                left: 16, 
                right: 16, 
                height: 300, 
                bgcolor: 'primary.main', 
                borderRadius: 2,
                boxShadow: '0 4px 20px 0 rgba(0,0,0,0.14), 0 7px 10px -5px rgba(26,115,232,0.4)',
                backgroundImage: 'linear-gradient(195deg, #49a3f1, #1A73E8)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <ThreeScene 
                  measurements={currentProject.measurements} 
                  dressType={currentProject.dressType}
                  fabric={currentProject.fabric}
                />
              </Box>
              <Box sx={{ mt: 32, p: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>3D Virtual Mannequin</Typography>
                <Typography variant="body2" color="textSecondary">Live parametric preview for {currentProject.customerName}</Typography>
                <Divider sx={{ my: 2 }} />
                <Typography variant="caption" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <Icon fontSize="inherit">access_time</Icon> Updated {currentProject.version} times
                </Typography>
              </Box>
            </Card>
          </Grid>

          {/* Pattern Canvas Card */}
          <Grid size={{ xs: 12, lg: 5 }}>
            <Card sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>Geometric Blueprint</Typography>
              <Box sx={{ bgcolor: '#f8f9fa', borderRadius: 2, border: '1px dashed #dee2e6' }}>
                <PatternCanvas pieces={currentProject.pieces} />
              </Box>
            </Card>
          </Grid>

          {/* Inputs & Toolkit */}
          <Grid size={{ xs: 12, lg: 4 }}>
            <Card sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 700 }}>Measurement Protocol</Typography>
              <MeasurementForm 
                initialValues={currentProject.measurements} 
                onUpdate={handleUpdateMeasurements} 
              />
            </Card>
          </Grid>

          <Grid size={{ xs: 12, lg: 8 }}>
            <Card sx={{ p: 0, overflow: 'hidden' }}>
              <Box sx={{ 
                p: 2, 
                bgcolor: '#ec407a', 
                backgroundImage: 'linear-gradient(195deg, #ec407a, #d81b60)',
                color: '#fff' 
              }}>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>Master Recommendations</Typography>
              </Box>
              <Box sx={{ p: 3 }}>
                <StitchToolkit fabric={currentProject.fabric} pieces={currentProject.pieces} />
                <Box sx={{ mt: 3 }}>
                  <Typography variant="subtitle2" sx={{ mb: 1 }}>Material Type</Typography>
                  <FormControl fullWidth size="small">
                    <Select 
                      value={currentProject.fabric.type}
                      onChange={(e) => handleFabricChange(e.target.value as string)}
                    >
                      <MenuItem value="Linen">Italian Linen</MenuItem>
                      <MenuItem value="Silk">Premium Silk</MenuItem>
                      <MenuItem value="Denim">Raw Denim</MenuItem>
                      <MenuItem value="Jersey">Technical Jersey</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

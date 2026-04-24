import React, { useState, useCallback, useRef, useEffect } from 'react';
import { ProjectState } from '../../../types/project';
import { StoreManager } from '../../../store/projectStore';
import { MeasurementForm } from '../../../components/MeasurementForm';
import { 
  Box, Grid, Card, Typography, IconButton, 
  Button, Divider, Paper, TextField, Alert
} from '@mui/material';
import { Undo, ArrowBack, Save } from '@mui/icons-material';

import { projectService } from '../../../services/project.service';

interface Props {
  initialProject: ProjectState;
  onExit: () => void;
  onUpdateSuccess: () => void;
}

export const ProjectDashboard: React.FC<Props> = ({ initialProject, onExit, onUpdateSuccess }) => {
  const [store] = useState(() => new StoreManager(initialProject));
  const [currentProject, setCurrentProject] = useState<ProjectState>(store.getState().project);
  const [projectName, setProjectName] = useState(initialProject.name);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleUpdateMeasurements = (measurements: any) => {
    // Map array measurements to the Record format expected by MeasurementForm if needed, 
    // but here currentProject.measurements is used by StoreManager.
    // StoreManager updateMeasurements expects Record<string, number>
    const mtRecord: Record<string, number> = {};
    if (Array.isArray(measurements)) {
        measurements.forEach(m => {
            mtRecord[m.measurementTypeId] = m.value;
        });
    } else {
        Object.assign(mtRecord, measurements);
    }

    store.getState().updateMeasurements(mtRecord);
    setCurrentProject({ ...store.getState().project });
  };

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    try {
      const updatedProject = {
        ...currentProject,
        name: projectName
      };
      await projectService.update(updatedProject.id, updatedProject);
      onUpdateSuccess();
      onExit();
    } catch (err) {
      console.error('Failed to save project:', err);
      setError('Failed to save project. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleUndo = () => {
    store.getState().undo();
    setCurrentProject({ ...store.getState().project });
  };

  // Convert ProjectState.measurements (array) to Record for MeasurementForm
  const measurementsRecord = React.useMemo(() => {
    const record: Record<string, number> = {};
    currentProject.measurements.forEach(m => {
      record[m.measurementTypeId] = m.value;
    });
    return record;
  }, [currentProject.measurements]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', bgcolor: '#f5f5f5' }}>
      {/* Navbar */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        p: 2, 
        bgcolor: '#fff', 
        borderBottom: '1px solid #ddd' 
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <IconButton onClick={onExit}><ArrowBack /></IconButton>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>Edit Project: {initialProject.name}</Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <IconButton onClick={handleUndo} title="Undo changes">
            <Undo />
          </IconButton>
          <Button 
            variant="contained" 
            startIcon={<Save />} 
            onClick={handleSave}
            loading={saving}
          >
            Save Changes
          </Button>
        </Box>
      </Box>

      <Box sx={{ flex: 1, p: 4, overflowY: 'auto' }}>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} md={8}>
            {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}
            
            <Paper sx={{ p: 3, mb: 3 }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>Project Details</Typography>
              <TextField
                label="Project Name"
                fullWidth
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                sx={{ mb: 2 }}
              />
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="body2" color="textSecondary">Gender</Typography>
                  <Typography variant="body1">{currentProject.gender}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="textSecondary">Dress Type ID</Typography>
                  <Typography variant="body1">{currentProject.dressType}</Typography>
                </Grid>
              </Grid>
            </Paper>

            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 700 }}>Measurements</Typography>
              <MeasurementForm 
                initialValues={measurementsRecord} 
                onUpdate={handleUpdateMeasurements} 
              />
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

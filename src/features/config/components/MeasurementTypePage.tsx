import React, { useState, useEffect } from 'react';
import { 
  Typography, Table, TableBody, TableCell, TableHead, TableRow, 
  IconButton, TextField, Button, Box, Alert, Snackbar 
} from '@mui/material';
import { Edit, Delete, Add, Save, Cancel } from '@mui/icons-material';
import { MeasurementType } from '../types/measurementType';
import { measurementTypeService } from '../api/measurementType.service';
import { 
  PageHeader, StyledTableContainer, FormCard, FormActions 
} from '../styles/measurementType.styles';

export const MeasurementTypePage: React.FC = () => {
  const [types, setTypes] = useState<MeasurementType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Form state
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: '', description: '' });
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    loadTypes();
  }, []);

  const loadTypes = async () => {
    try {
      setLoading(true);
      const data = await measurementTypeService.getAll();
      setTypes(data);
    } catch (err) {
      setError('Backend connection failed. Please ensure the server is running and the database is connected.');
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async () => {
    if (!formData.name || !formData.description) return;
    try {
      const newType = await measurementTypeService.create(formData);
      setTypes([...types, newType]);
      setFormData({ name: '', description: '' });
      setIsAdding(false);
    } catch (err) {
      setError('Failed to save. Check if the database connection is active in the backend.');
    }
  };

  const handleUpdate = async (id: string) => {
    try {
      const updatedType = await measurementTypeService.update(id, formData);
      setTypes(types.map(t => t._id === id ? updatedType : t));
      setIsEditing(null);
      setFormData({ name: '', description: '' });
    } catch (err) {
      setError('Failed to update measurement type');
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this measurement type?')) return;
    try {
      await measurementTypeService.delete(id);
      setTypes(types.filter(t => t._id !== id));
    } catch (err) {
      setError('Failed to delete measurement type');
    }
  };

  const startEdit = (type: MeasurementType) => {
    setIsEditing(type._id!);
    setFormData({ name: type.name, description: type.description });
  };

  return (
    <Box sx={{ p: 4 }}>
      <PageHeader>
        <Typography variant="h4" sx={{ fontWeight: 700 }}>Measurement Types</Typography>
        {!isAdding && (
          <Button 
            variant="contained" 
            startIcon={<Add />} 
            onClick={() => { setIsAdding(true); setFormData({ name: '', description: '' }); }}
          >
            Add New Type
          </Button>
        )}
      </PageHeader>

      {isAdding && (
        <FormCard>
          <Typography variant="h6" sx={{ mb: 2 }}>Add New Measurement Type</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              fullWidth
            />
            <TextField
              label="Description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              fullWidth
              multiline
              rows={2}
            />
          </Box>
          <FormActions>
            <Button onClick={() => setIsAdding(false)}>Cancel</Button>
            <Button variant="contained" onClick={handleAdd}>Save Type</Button>
          </FormActions>
        </FormCard>
      )}

      <StyledTableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 700 }}>Name</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Description</TableCell>
              <TableCell sx={{ fontWeight: 700, width: 120 }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {types.map((type) => (
              <TableRow key={type._id}>
                <TableCell>
                  {isEditing === type._id ? (
                    <TextField 
                      size="small" 
                      value={formData.name} 
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })} 
                    />
                  ) : type.name}
                </TableCell>
                <TableCell>
                  {isEditing === type._id ? (
                    <TextField 
                      size="small" 
                      fullWidth 
                      value={formData.description} 
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })} 
                    />
                  ) : type.description}
                </TableCell>
                <TableCell>
                  {isEditing === type._id ? (
                    <Box sx={{ display: 'flex' }}>
                      <IconButton color="primary" onClick={() => handleUpdate(type._id!)}>
                        <Save fontSize="small" />
                      </IconButton>
                      <IconButton onClick={() => setIsEditing(null)}>
                        <Cancel fontSize="small" />
                      </IconButton>
                    </Box>
                  ) : (
                    <Box sx={{ display: 'flex' }}>
                      <IconButton color="info" onClick={() => startEdit(type)}>
                        <Edit fontSize="small" />
                      </IconButton>
                      <IconButton color="error" onClick={() => handleDelete(type._id!)}>
                        <Delete fontSize="small" />
                      </IconButton>
                    </Box>
                  )}
                </TableCell>
              </TableRow>
            ))}
            {types.length === 0 && !loading && (
              <TableRow>
                <TableCell colSpan={3} align="center" sx={{ py: 3 }}>
                  No measurement types defined.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </StyledTableContainer>

      <Snackbar open={!!error} autoHideDuration={6000} onClose={() => setError(null)}>
        <Alert severity="error">{error}</Alert>
      </Snackbar>
    </Box>
  );
};

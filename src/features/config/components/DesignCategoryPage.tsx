import React, { useState, useEffect } from 'react';
import { 
  Typography, Table, TableBody, TableCell, TableHead, TableRow, 
  IconButton, TextField, Button, Box, Alert, Snackbar 
} from '@mui/material';
import { Edit, Delete, Add, Save, Cancel } from '@mui/icons-material';
import { DesignCategory } from '../types/designCategory';
import { designCategoryService } from '../api/designCategory.service';
import { 
  PageHeader, StyledTableContainer, FormCard, FormActions 
} from '../styles/measurementType.styles';

export const DesignCategoryPage: React.FC = () => {
  const [categories, setCategories] = useState<DesignCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Form state
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: '' });
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      setLoading(true);
      const data = await designCategoryService.getAll();
      setCategories(data);
    } catch (err) {
      setError('Backend connection failed. Please ensure the server is running.');
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async () => {
    if (!formData.name || formData.name.length > 50) return;
    try {
      const newCategory = await designCategoryService.create(formData);
      setCategories([...categories, newCategory]);
      setFormData({ name: '' });
      setIsAdding(false);
    } catch (err) {
      setError('Failed to save. Check if the database connection is active.');
    }
  };

  const handleUpdate = async (id: string) => {
    if (!formData.name || formData.name.length > 50) return;
    try {
      const updated = await designCategoryService.update(id, formData);
      setCategories(categories.map(c => c._id === id ? updated : c));
      setIsEditing(null);
      setFormData({ name: '' });
    } catch (err) {
      setError('Failed to update design category');
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this design category?')) return;
    try {
      await designCategoryService.delete(id);
      setCategories(categories.filter(c => c._id !== id));
    } catch (err) {
      setError('Failed to delete design category');
    }
  };

  const startEdit = (category: DesignCategory) => {
    setIsEditing(category._id!);
    setFormData({ name: category.name });
  };

  return (
    <Box sx={{ p: 4 }}>
      <PageHeader>
        <Typography variant="h4" sx={{ fontWeight: 700 }}>Design Categories</Typography>
        {!isAdding && (
          <Button 
            variant="contained" 
            startIcon={<Add />} 
            onClick={() => { setIsAdding(true); setFormData({ name: '' }); }}
          >
            Add New Category
          </Button>
        )}
      </PageHeader>

      {isAdding && (
        <FormCard>
          <Typography variant="h6" sx={{ mb: 2 }}>Add New Design Category</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="Category Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              fullWidth
              autoFocus
              slotProps={{ htmlInput: { maxLength: 50 } }}
              helperText={`${formData.name.length}/50`}
            />
          </Box>
          <FormActions>
            <Button onClick={() => setIsAdding(false)}>Cancel</Button>
            <Button variant="contained" onClick={handleAdd}>Save Category</Button>
          </FormActions>
        </FormCard>
      )}

      <StyledTableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 700 }}>Category Name</TableCell>
              <TableCell sx={{ fontWeight: 700, width: 120 }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories.map((category) => (
              <TableRow key={category._id}>
                <TableCell>
                  {isEditing === category._id ? (
                    <TextField 
                      size="small" 
                      value={formData.name} 
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })} 
                      fullWidth
                      slotProps={{ htmlInput: { maxLength: 50 } }}
                      helperText={`${formData.name.length}/50`}
                    />
                  ) : category.name}
                </TableCell>
                <TableCell>
                  {isEditing === category._id ? (
                    <Box sx={{ display: 'flex' }}>
                      <IconButton color="primary" onClick={() => handleUpdate(category._id!)}>
                        <Save fontSize="small" />
                      </IconButton>
                      <IconButton onClick={() => setIsEditing(null)}>
                        <Cancel fontSize="small" />
                      </IconButton>
                    </Box>
                  ) : (
                    <Box sx={{ display: 'flex' }}>
                      <IconButton color="info" onClick={() => startEdit(category)}>
                        <Edit fontSize="small" />
                      </IconButton>
                      <IconButton color="error" onClick={() => handleDelete(category._id!)}>
                        <Delete fontSize="small" />
                      </IconButton>
                    </Box>
                  )}
                </TableCell>
              </TableRow>
            ))}
            {categories.length === 0 && !loading && (
              <TableRow>
                <TableCell colSpan={2} align="center" sx={{ py: 3 }}>
                  No design categories defined.
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

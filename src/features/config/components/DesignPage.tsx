import React, { useState, useEffect } from 'react';
import { 
  Typography, Table, TableBody, TableCell, TableHead, TableRow, 
  IconButton, TextField, Button, Box, Alert, Snackbar,
  Dialog, DialogTitle, DialogContent, DialogActions,
  FormControl, InputLabel, Select, MenuItem, FormHelperText
} from '@mui/material';
import { Edit, Delete, Add, Save, Cancel } from '@mui/icons-material';
import { IDesign } from '../types/design';
import { DesignCategory } from '../types/designCategory';
import { designService } from '../api/design.service';
import { designCategoryService } from '../api/designCategory.service';
import { 
  PageHeader, StyledTableContainer
} from '../styles/measurementType.styles';

export const DesignPage: React.FC = () => {
  const [designs, setDesigns] = useState<IDesign[]>([]);
  const [categories, setCategories] = useState<DesignCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Dialog state
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogMode, setDialogMode] = useState<'add' | 'edit'>('add');
  const [currentId, setCurrentId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ 
    name: '', 
    category: '', 
    description: '' 
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [designsData, categoriesData] = await Promise.all([
        designService.getAll(),
        designCategoryService.getAll()
      ]);
      setDesigns(designsData);
      setCategories(categoriesData);
    } catch (err) {
      setError('Failed to load data. Please ensure the server is running.');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenAdd = () => {
    setDialogMode('add');
    setFormData({ name: '', category: '', description: '' });
    setOpenDialog(true);
  };

  const handleOpenEdit = (design: IDesign) => {
    setDialogMode('edit');
    setCurrentId(design._id!);
    setFormData({ 
      name: design.name, 
      category: typeof design.category === 'object' ? design.category._id : design.category, 
      description: design.description || '' 
    });
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleSave = async () => {
    if (!formData.name || !formData.category || formData.name.length > 50) return;
    
    try {
      if (dialogMode === 'add') {
        const newDesign = await designService.create(formData);
        setDesigns([...designs, newDesign]);
      } else if (currentId) {
        const updated = await designService.update(currentId, formData);
        setDesigns(designs.map(d => d._id === currentId ? updated : d));
      }
      handleCloseDialog();
    } catch (err) {
      setError('Failed to save design');
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this design?')) return;
    try {
      await designService.delete(id);
      setDesigns(designs.filter(d => d._id !== id));
    } catch (err) {
      setError('Failed to delete design');
    }
  };

  const getCategoryName = (category: string | DesignCategory) => {
    if (typeof category === 'object') return category.name;
    return categories.find(c => c._id === category)?.name || 'Unknown';
  };

  return (
    <Box sx={{ p: 4 }}>
      <PageHeader>
        <Typography variant="h4" sx={{ fontWeight: 700 }}>Designs</Typography>
        <Button 
          variant="contained" 
          startIcon={<Add />} 
          onClick={handleOpenAdd}
        >
          Add Design
        </Button>
      </PageHeader>

      <StyledTableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 700 }}>Design Name</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Category</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Description</TableCell>
              <TableCell sx={{ fontWeight: 700, width: 120 }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {designs.map((design) => (
              <TableRow key={design._id}>
                <TableCell>{design.name}</TableCell>
                <TableCell>{getCategoryName(design.category)}</TableCell>
                <TableCell>{design.description}</TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex' }}>
                    <IconButton color="info" onClick={() => handleOpenEdit(design)}>
                      <Edit fontSize="small" />
                    </IconButton>
                    <IconButton color="error" onClick={() => handleDelete(design._id!)}>
                      <Delete fontSize="small" />
                    </IconButton>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
            {designs.length === 0 && !loading && (
              <TableRow>
                <TableCell colSpan={4} align="center" sx={{ py: 3 }}>
                  No designs defined.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </StyledTableContainer>

      <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth maxWidth="sm">
        <DialogTitle>{dialogMode === 'add' ? 'Add New Design' : 'Edit Design'}</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mt: 1 }}>
            <TextField
              label="Design Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              fullWidth
              required
              slotProps={{ htmlInput: { maxLength: 50 } }}
              helperText={`${formData.name.length}/50`}
              error={formData.name.length > 50}
            />
            
            <FormControl fullWidth required>
              <InputLabel>Design Category</InputLabel>
              <Select
                value={formData.category}
                label="Design Category"
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              >
                {categories.map((category) => (
                  <MenuItem key={category._id} value={category._id}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
              {categories.length === 0 && (
                <FormHelperText error>No categories found. Create one in Configurations.</FormHelperText>
              )}
            </FormControl>

            <TextField
              label="Description (Optional)"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              fullWidth
              multiline
              rows={2}
              slotProps={{ htmlInput: { maxLength: 50 } }}
              helperText="Max 50 characters"
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button 
            variant="contained" 
            onClick={handleSave}
            disabled={!formData.name || !formData.category || formData.name.length > 50}
          >
            {dialogMode === 'add' ? 'Save Design' : 'Update Design'}
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={!!error} autoHideDuration={6000} onClose={() => setError(null)}>
        <Alert severity="error">{error}</Alert>
      </Snackbar>
    </Box>
  );
};

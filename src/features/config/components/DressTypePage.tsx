import React, { useState, useEffect } from 'react';
import { 
  Typography, Table, TableBody, TableCell, TableHead, TableRow, 
  Button, Box, Dialog, DialogTitle, DialogContent, 
  DialogActions, TextField, Select, MenuItem, FormControl, InputLabel,
  Alert, Snackbar, IconButton
} from '@mui/material';
import { Add, Close, Edit, Delete } from '@mui/icons-material';
import { DressType } from '../types/dressType';
import { SizeChart } from '../types/sizeChart';
import { dressTypeService } from '../api/dressType.service';
import { sizeChartService } from '../api/sizeChart.service';
import { PageHeader, StyledTableContainer } from '../styles/measurementType.styles';

export const DressTypePage: React.FC = () => {
  const [dressTypes, setDressTypes] = useState<DressType[]>([]);
  const [sizeCharts, setSizeCharts] = useState<SizeChart[]>([]);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [gender, setGender] = useState<'Male' | 'Female'>('Female');
  const [description, setDescription] = useState('');
  const [sizeChartId, setSizeChartId] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [dressData, chartData] = await Promise.all([
        dressTypeService.getAll(),
        sizeChartService.getAll()
      ]);
      setDressTypes(dressData);
      setSizeCharts(chartData);
    } catch (err) {
      setError('Failed to load data');
    }
  };

  const handleSave = async () => {
    if (!name || !gender || !sizeChartId) return;
    try {
      if (editingId) {
        const updated = await dressTypeService.update(editingId, { name, gender, description, sizeChartId });
        setDressTypes(dressTypes.map(d => d._id === editingId ? updated : d));
      } else {
        const newType = await dressTypeService.create({ name, gender, description, sizeChartId });
        setDressTypes([...dressTypes, newType]);
      }
      setOpen(false);
      resetForm();
    } catch (err) {
      setError('Failed to save dress type');
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this dress type?')) return;
    try {
      await dressTypeService.delete(id);
      setDressTypes(dressTypes.filter(d => d._id !== id));
    } catch (err) {
      setError('Failed to delete dress type');
    }
  };

  const startEdit = (dt: DressType) => {
    setEditingId(dt._id!);
    setName(dt.name);
    setGender(dt.gender);
    setDescription(dt.description);
    setSizeChartId(typeof dt.sizeChartId === 'string' ? dt.sizeChartId : (dt.sizeChartId as SizeChart)._id!);
    setOpen(true);
  };

  const resetForm = () => {
    setEditingId(null); setName(''); setGender('Female'); setDescription(''); setSizeChartId('');
  };

  return (
    <Box sx={{ p: 4 }}>
      <PageHeader>
        <Typography variant="h4" sx={{ fontWeight: 700 }}>Dress Types</Typography>
        <Button variant="contained" startIcon={<Add />} onClick={() => { resetForm(); setOpen(true); }}>Add Dress Type</Button>
      </PageHeader>

      <StyledTableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 700 }}>Name</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Gender</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Size Chart</TableCell>
              <TableCell sx={{ fontWeight: 700, width: 120 }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dressTypes.map((dt) => (
              <TableRow key={dt._id}>
                <TableCell>{dt.name}</TableCell>
                <TableCell>{dt.gender}</TableCell>
                <TableCell>{(dt.sizeChartId as SizeChart).name}</TableCell>
                <TableCell>
                    <Box sx={{ display: 'flex' }}>
                        <IconButton color="info" onClick={() => startEdit(dt)}><Edit fontSize="small" /></IconButton>
                        <IconButton color="error" onClick={() => handleDelete(dt._id!)}><Delete fontSize="small" /></IconButton>
                    </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </StyledTableContainer>

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>{editingId ? 'Edit Dress Type' : 'Create New Dress Type'}</DialogTitle>
        <DialogContent dividers>
          {(!name || !gender || !sizeChartId || name.length > 50 || description.length > 250) && (
            <Alert severity="warning" sx={{ mb: 2 }}>
              Please ensure all mandatory fields (Name, Gender, Size Chart) are filled and within character limits (Name: 50, Description: 250).
            </Alert>
          )}
          <TextField 
            label="Name" fullWidth margin="dense" 
            slotProps={{ htmlInput: { maxLength: 50 } }}
            value={name} onChange={(e) => setName(e.target.value)} 
            helperText={`${name.length}/50`}
          />
          <FormControl fullWidth margin="dense">
            <InputLabel>Gender</InputLabel>
            <Select value={gender} label="Gender" onChange={(e) => setGender(e.target.value as 'Male' | 'Female')}>
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
            </Select>
          </FormControl>
          <TextField 
            label="Description" fullWidth margin="dense" multiline rows={3} 
            slotProps={{ htmlInput: { maxLength: 250 } }}
            value={description} onChange={(e) => setDescription(e.target.value)} 
            helperText={`${description.length}/250`}
          />
          <FormControl fullWidth margin="dense">
            <InputLabel>Size Chart</InputLabel>
            <Select value={sizeChartId} label="Size Chart" onChange={(e) => setSizeChartId(e.target.value)}>
              {sizeCharts.filter(sc => sc.gender === gender).map(sc => (
                <MenuItem key={sc._id} value={sc._id}>{sc.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button 
            variant="contained" 
            onClick={handleSave} 
            disabled={!name || name.length > 50 || !gender || !sizeChartId || description.length > 250}
          >
            {editingId ? 'Update' : 'Save'}
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar open={!!error} autoHideDuration={6000} onClose={() => setError(null)}>
        <Alert severity="error">{error}</Alert>
      </Snackbar>
    </Box>
  );
};

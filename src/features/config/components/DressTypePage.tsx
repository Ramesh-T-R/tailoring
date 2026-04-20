import React, { useState, useEffect } from 'react';
import { 
  Typography, Table, TableBody, TableCell, TableHead, TableRow, 
  Button, Box, Dialog, DialogTitle, DialogContent, 
  DialogActions, TextField, Select, MenuItem, FormControl, InputLabel,
  Alert, Snackbar
} from '@mui/material';
import { Add, Close } from '@mui/icons-material';
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
      const newType = await dressTypeService.create({ name, gender, description, sizeChartId });
      setDressTypes([...dressTypes, newType]);
      setOpen(false);
      resetForm();
    } catch (err) {
      setError('Failed to create dress type');
    }
  };

  const resetForm = () => {
    setName(''); setGender('Female'); setDescription(''); setSizeChartId('');
  };

  return (
    <Box sx={{ p: 4 }}>
      <PageHeader>
        <Typography variant="h4" sx={{ fontWeight: 700 }}>Dress Types</Typography>
        <Button variant="contained" startIcon={<Add />} onClick={() => setOpen(true)}>Add Dress Type</Button>
      </PageHeader>

      <StyledTableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 700 }}>Name</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Gender</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Size Chart</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dressTypes.map((dt) => (
              <TableRow key={dt._id}>
                <TableCell>{dt.name}</TableCell>
                <TableCell>{dt.gender}</TableCell>
                <TableCell>{(dt.sizeChartId as SizeChart).name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </StyledTableContainer>

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Create New Dress Type</DialogTitle>
        <DialogContent dividers>
          <TextField label="Name" fullWidth margin="dense" value={name} onChange={(e) => setName(e.target.value)} />
          <FormControl fullWidth margin="dense">
            <InputLabel>Gender</InputLabel>
            <Select value={gender} label="Gender" onChange={(e) => setGender(e.target.value as 'Male' | 'Female')}>
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
            </Select>
          </FormControl>
          <TextField label="Description" fullWidth margin="dense" multiline rows={3} value={description} onChange={(e) => setDescription(e.target.value)} />
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
          <Button variant="contained" onClick={handleSave} disabled={!name || !gender || !sizeChartId}>Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

import React, { useState, useEffect } from 'react';
import { 
  Typography, Table, TableBody, TableCell, TableHead, TableRow, 
  IconButton, Button, Box, Dialog, DialogTitle, DialogContent, 
  DialogActions, TextField, Select, MenuItem, FormControl, InputLabel,
  Autocomplete, Alert, Snackbar, Checkbox
} from '@mui/material';
import { Add, Delete, Save, Close, Edit, ContentCopy } from '@mui/icons-material';
import { SizeChart, SizeType, SizeChartEntry } from '../types/sizeChart';
import { MeasurementType } from '../types/measurementType';
import { sizeChartService } from '../api/sizeChart.service';
import { measurementTypeService } from '../api/measurementType.service';
import { PageHeader, StyledTableContainer } from '../styles/measurementType.styles';

export const SizeChartPage: React.FC = () => {
  const [charts, setCharts] = useState<SizeChart[]>([]);
  const [sizeTypes, setSizeTypes] = useState<SizeType[]>([]);
  const [measurementTypes, setMeasurementTypes] = useState<MeasurementType[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Form State
  const [editingId, setEditingId] = useState<string | null>(null);
  const [chartName, setName] = useState('');
  const [gender, setGender] = useState<'Male' | 'Female'>('Female');
  const [entries, setEntries] = useState<Partial<SizeChartEntry>[]>([]);
  const [selectedIndices, setSelectedIndices] = useState<number[]>([]);
  
  // Clone Modal State
  const [cloneOpen, setCloneOpen] = useState(false);
  const [cloneSize, setCloneSize] = useState('');
  const [cloneUnit, setCloneUnit] = useState<'cm' | 'in'>('cm');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [chartsData, typesData, mData] = await Promise.all([
        sizeChartService.getAll(),
        sizeChartService.getSizeTypes(),
        measurementTypeService.getAll()
      ]);
      setCharts(chartsData);
      setSizeTypes(typesData);
      setMeasurementTypes(mData);
    } catch (err) {
      setError('Failed to load configuration data');
    } finally {
      setLoading(false);
    }
  };

  const isDuplicate = () => {
    const seen = new Set();
    for (const entry of entries) {
      if (!entry.sizeTypeId || !entry.measurementTypeId || !entry.unit) continue;
      const key = `${entry.sizeTypeId}-${entry.measurementTypeId}-${entry.unit}`;
      if (seen.has(key)) return true;
      seen.add(key);
    }
    return false;
  };

  const isInvalid = () => {
    const seen = new Set();
    for (const entry of entries) {
      // Check for missing required fields
      if (!entry.sizeTypeId || !entry.measurementTypeId || !entry.unit || entry.value === undefined || entry.value === null) return true;
      
      const key = `${entry.sizeTypeId}-${entry.measurementTypeId}-${entry.unit}`;
      if (seen.has(key)) return true;
      seen.add(key);
      
      // Check range
      if (entry.value < 0 || entry.value > 250) return true;
    }
    return false;
  };

  const isFormIncomplete = () => !chartName || chartName.length > 50 || !gender || entries.length === 0;

  const toggleSelection = (index: number) => {
    if (selectedIndices.includes(index)) {
      setSelectedIndices(selectedIndices.filter(i => i !== index));
    } else {
      setSelectedIndices([...selectedIndices, index]);
    }
  };

  const handleAddRow = () => {
    setEntries([...entries, { sizeTypeId: '', measurementTypeId: '', unit: 'cm', value: 0 }]);
  };

  const handleRemoveRow = (index: number) => {
    setEntries(entries.filter((_, i) => i !== index));
    setSelectedIndices(selectedIndices.filter(i => i !== index).map(i => i > index ? i - 1 : i));
  };

  const handleEntryChange = (index: number, field: keyof SizeChartEntry, value: any) => {
    const newEntries = [...entries];
    newEntries[index] = { ...newEntries[index], [field]: value };
    setEntries(newEntries);
  };

  const handleClone = () => {
    const newRows = selectedIndices.map(index => ({
        ...entries[index],
        sizeTypeId: cloneSize,
        unit: cloneUnit
    }));
    setEntries([...entries, ...newRows]);
    setSelectedIndices([]);
    setCloneOpen(false);
  };

  const handleSaveChart = async () => {
    if (!chartName || !gender || entries.length === 0 || isDuplicate()) return;
    try {
      if (editingId) {
        const updated = await sizeChartService.update(editingId, { name: chartName, gender, entries: entries as SizeChartEntry[] });
        setCharts(charts.map(c => c._id === editingId ? updated : c));
      } else {
        const newChart = await sizeChartService.create({ name: chartName, gender, entries: entries as SizeChartEntry[] });
        setCharts([newChart, ...charts]);
      }
      setOpen(false);
      resetForm();
    } catch (err) {
      setError('Failed to save size chart');
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this chart?')) return;
    try {
      await sizeChartService.delete(id);
      setCharts(charts.filter(c => c._id !== id));
    } catch (err) {
      setError('Failed to delete size chart');
    }
  };

  const startEdit = (chart: SizeChart) => {
    setEditingId(chart._id!);
    setName(chart.name);
    setGender(chart.gender);
    setEntries(chart.entries.map(e => ({
        sizeTypeId: typeof e.sizeTypeId === 'string' ? e.sizeTypeId : (e.sizeTypeId as SizeType)._id,
        measurementTypeId: typeof e.measurementTypeId === 'string' ? e.measurementTypeId : (e.measurementTypeId as MeasurementType)._id,
        unit: e.unit,
        value: e.value
    })));
    setOpen(true);
  };

  const resetForm = () => {
    setEditingId(null);
    setName('');
    setGender('Female');
    setEntries([]);
    setSelectedIndices([]);
  };

  return (
    <Box sx={{ p: 4 }}>
      <PageHeader>
        <Typography variant="h4" sx={{ fontWeight: 700 }}>Size Charts</Typography>
        <Button 
          variant="contained" 
          startIcon={<Add />} 
          onClick={() => { resetForm(); setOpen(true); }}
        >
          Add Size Chart
        </Button>
      </PageHeader>

      <StyledTableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 700 }}>Chart Name</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Gender</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Entries</TableCell>
              <TableCell sx={{ fontWeight: 700, width: 120 }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {charts.map((chart) => (
              <TableRow key={chart._id}>
                <TableCell>{chart.name}</TableCell>
                <TableCell>{chart.gender}</TableCell>
                <TableCell>{chart.entries.length} measurements</TableCell>
                <TableCell>
                    <Box sx={{ display: 'flex' }}>
                        <IconButton color="info" onClick={() => startEdit(chart)}><Edit fontSize="small" /></IconButton>
                        <IconButton color="error" onClick={() => handleDelete(chart._id!)}><Delete fontSize="small" /></IconButton>
                    </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </StyledTableContainer>

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle sx={{ fontWeight: 700, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {editingId ? 'Edit Size Chart' : 'Create New Size Chart'}
          <Box>
            <Button 
                variant="outlined" 
                disabled={selectedIndices.length === 0}
                onClick={() => { console.log('Clone clicked'); setCloneOpen(true); }}
                startIcon={<ContentCopy />}
                sx={{ mr: 2 }}
            >
                Clone
            </Button>
            <IconButton onClick={() => setOpen(false)}><Close /></IconButton>
          </Box>
        </DialogTitle>
        <DialogContent dividers>
          {isInvalid() ? (
            <Alert severity="error" sx={{ mb: 2 }}>
              Validation Error: Please fix duplicate entries or values out of range (0-250).
            </Alert>
          ) : isFormIncomplete() && (
            <Alert severity="warning" sx={{ mb: 2 }}>
              Please provide a chart name and at least one valid measurement entry.
            </Alert>
          )}
          <TextField
            autoFocus margin="dense" label="Size Chart Name" fullWidth variant="outlined"
            inputProps={{ maxLength: 50 }}
            value={chartName} onChange={(e) => setName(e.target.value)} sx={{ mb: 2 }}
          />
          <FormControl fullWidth margin="dense" sx={{ mb: 3 }}>
            <InputLabel>Gender</InputLabel>
            <Select value={gender} label="Gender" onChange={(e) => setGender(e.target.value as 'Male' | 'Female')}>
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
            </Select>
          </FormControl>

          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox"><Checkbox indeterminate={selectedIndices.length > 0 && selectedIndices.length < entries.length} checked={selectedIndices.length === entries.length && entries.length > 0} onChange={() => selectedIndices.length === entries.length ? setSelectedIndices([]) : setSelectedIndices(entries.map((_, i) => i))} /></TableCell>
                <TableCell>Size Type</TableCell>
                <TableCell>Measurement Type</TableCell>
                <TableCell>Metric Unit</TableCell>
                <TableCell>Value</TableCell>
                <TableCell width={50}></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {entries.map((entry, index) => (
                <TableRow key={index} selected={selectedIndices.includes(index)}>
                  <TableCell padding="checkbox">
                    <Checkbox checked={selectedIndices.includes(index)} onChange={() => toggleSelection(index)} />
                  </TableCell>
                  <TableCell>
                    <FormControl fullWidth size="small">
                      <Select value={entry.sizeTypeId} onChange={(e) => handleEntryChange(index, 'sizeTypeId', e.target.value)}>
                        {sizeTypes.map(st => <MenuItem key={st._id} value={st._id}>{st.name}</MenuItem>)}
                      </Select>
                    </FormControl>
                  </TableCell>
                  <TableCell>
                    <Autocomplete
                      size="small"
                      options={measurementTypes}
                      getOptionLabel={(option) => option.name}
                      value={measurementTypes.find(mt => mt._id === entry.measurementTypeId) || null}
                      onChange={(_, newValue) => handleEntryChange(index, 'measurementTypeId', newValue?._id || '')}
                      renderInput={(params) => <TextField {...params} label="Search..." />}
                    />
                  </TableCell>
                  <TableCell>
                    <Select fullWidth size="small" value={entry.unit} onChange={(e) => handleEntryChange(index, 'unit', e.target.value)}>
                      <MenuItem value="cm">cm</MenuItem>
                      <MenuItem value="in">in</MenuItem>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <TextField
                      size="small" type="number" 
                      inputProps={{ step: "0.1", min: 0, max: 250 }}
                      value={entry.value} 
                      onChange={(e) => {
                          const val = parseFloat(e.target.value);
                          handleEntryChange(index, 'value', val);
                      }}
                      error={entry.value! < 0 || entry.value! > 250}
                      helperText={(entry.value! < 0 || entry.value! > 250) ? "0-250" : ""}
                    />
                  </TableCell>
                  <TableCell>
                    <IconButton size="small" color="error" onClick={() => handleRemoveRow(index)}><Delete fontSize="small" /></IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          <Button startIcon={<Add />} onClick={handleAddRow} sx={{ mt: 2 }}>Add Row</Button>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button 
            variant="contained" 
            onClick={handleSaveChart}
            disabled={!chartName || !gender || entries.length === 0 || isDuplicate()}
            startIcon={<Save />}
          >
            {editingId ? 'Update Size Chart' : 'Save Size Chart'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Clone Dialog - Moved outside of the main modal */}
      <Dialog open={cloneOpen} onClose={() => setCloneOpen(false)}>
        <DialogTitle>Clone Entries</DialogTitle>
        <DialogContent>
          <FormControl fullWidth margin="dense" sx={{ mb: 2 }}>
            <InputLabel>Target Size Type</InputLabel>
            <Select value={cloneSize} label="Target Size Type" onChange={(e) => setCloneSize(e.target.value)}>
              {sizeTypes.map(st => <MenuItem key={st._id} value={st._id}>{st.name}</MenuItem>)}
            </Select>
          </FormControl>
          <FormControl fullWidth margin="dense">
            <InputLabel>Target Unit</InputLabel>
            <Select value={cloneUnit} label="Target Unit" onChange={(e) => setCloneUnit(e.target.value as 'cm' | 'in')}>
              <MenuItem value="cm">cm</MenuItem>
              <MenuItem value="in">in</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCloneOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleClone} disabled={!cloneSize}>Clone</Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={!!error} autoHideDuration={6000} onClose={() => setError(null)}>
        <Alert severity="error">{error}</Alert>
      </Snackbar>
    </Box>
  );
};

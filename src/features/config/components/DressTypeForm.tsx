import React, { useState, useEffect } from 'react';
import { 
  Typography, Button, Box, TextField, Select, MenuItem, 
  FormControl, InputLabel, Alert, Snackbar, Paper,
  Table, TableBody, TableCell, TableHead, TableRow, IconButton,
  Dialog, DialogTitle, DialogContent, DialogActions, Chip
} from '@mui/material';
import { Add, Delete, Save, ArrowBack, Edit } from '@mui/icons-material';
import { DressType, DesignCombination, DesignPair } from '../types/dressType';
import { SizeChart } from '../types/sizeChart';
import { DesignCategory } from '../types/designCategory';
import { IDesign } from '../types/design';
import { dressTypeService } from '../api/dressType.service';
import { sizeChartService } from '../api/sizeChart.service';
import { designCategoryService } from '../api/designCategory.service';
import { designService } from '../api/design.service';
import { PageHeader } from '../styles/measurementType.styles';

interface Props {
  initialData: DressType | null;
  onSave: () => void;
  onCancel: () => void;
}

export const DressTypeForm: React.FC<Props> = ({ initialData, onSave, onCancel }) => {
  const [sizeCharts, setSizeCharts] = useState<SizeChart[]>([]);
  const [categories, setCategories] = useState<DesignCategory[]>([]);
  const [allDesigns, setAllDesigns] = useState<IDesign[]>([]);
  
  const [name, setName] = useState(initialData?.name || '');
  const [gender, setGender] = useState<'Male' | 'Female'>(initialData?.gender || 'Female');
  const [description, setDescription] = useState(initialData?.description || '');
  const [sizeChartId, setSizeChartId] = useState(
    initialData?.sizeChartId 
      ? (typeof initialData.sizeChartId === 'string' ? initialData.sizeChartId : initialData.sizeChartId._id!) 
      : ''
  );
  const [designCombinations, setDesignCombinations] = useState<DesignCombination[]>(initialData?.designCombinations || []);
  
  const [modalOpen, setModalOpen] = useState(false);
  const [editingComboIndex, setEditingComboIndex] = useState<number | null>(null);
  const [tempRows, setTempRows] = useState<{ categoryId: string, designId: string }[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [charts, cats, designs] = await Promise.all([
        sizeChartService.getAll(),
        designCategoryService.getAll(),
        designService.getAll()
      ]);
      setSizeCharts(charts);
      setCategories(cats);
      setAllDesigns(designs);
    } catch (err) {
      setError('Failed to load configuration data');
    }
  };

  const handleSave = async () => {
    if (!name || !gender || !sizeChartId) return;
    try {
      const data = { name, gender, description, sizeChartId, designCombinations };
      if (initialData?._id) {
        await dressTypeService.update(initialData._id, data);
      } else {
        await dressTypeService.create(data);
      }
      onSave();
    } catch (err) {
      setError('Failed to save dress type');
    }
  };

  const handleOpenModal = (index: number | null) => {
    setEditingComboIndex(index);
    if (index !== null) {
      const rows = designCombinations[index].designIds.map(id => {
        const design = allDesigns.find(d => String(d._id) === String(id));
        const catId = design ? (typeof design.category === 'string' ? design.category : design.category?._id) : '';
        return { categoryId: String(catId), designId: String(id) };
      });
      setTempRows(rows);
    } else {
      setTempRows([{ categoryId: '', designId: '' }]);
    }
    setModalOpen(true);
  };

  const handleAddRow = () => {
    setTempRows([...tempRows, { categoryId: '', designId: '' }]);
  };

  const handleRemoveRow = (index: number) => {
    const updated = tempRows.filter((_, i) => i !== index);
    setTempRows(updated.length === 0 ? [{ categoryId: '', designId: '' }] : updated);
  };

  const handleUpdateRow = (index: number, field: 'categoryId' | 'designId', value: string) => {
    const updated = [...tempRows];
    updated[index] = { ...updated[index], [field]: value };
    if (field === 'categoryId') {
      updated[index].designId = ''; // Reset design when category changes
    }
    setTempRows(updated);
  };

  const handleSaveModal = () => {
    const validIds = tempRows.map(r => r.designId).filter(id => id);
    if (validIds.length === 0) return;

    const newCombo: DesignCombination = { designIds: validIds };
    const updatedCombos = [...designCombinations];
    
    if (editingComboIndex !== null) {
      updatedCombos[editingComboIndex] = newCombo;
    } else {
      updatedCombos.push(newCombo);
    }
    
    setDesignCombinations(updatedCombos);
    setModalOpen(false);
  };

  const handleDeleteCombo = (index: number) => {
    setDesignCombinations(designCombinations.filter((_, i) => i !== index));
  };

  const getCategoryName = (id: string) => {
    const cat = categories.find(c => String(c._id) === String(id));
    return cat ? cat.name : id;
  };
  
  const getDesignName = (id: string) => {
    const design = allDesigns.find(d => String(d._id) === String(id));
    return design ? design.name : id;
  };

  const getDesignCategoryName = (designId: string) => {
    const design = allDesigns.find(d => String(d._id) === String(designId));
    if (!design) return '';
    const catId = typeof design.category === 'string' ? design.category : design.category?._id;
    return getCategoryName(String(catId));
  };

  return (
    <Box sx={{ p: 4 }}>
      <PageHeader>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <IconButton onClick={onCancel}><ArrowBack /></IconButton>
          <Typography variant="h4" sx={{ fontWeight: 700 }}>
            {initialData ? 'Edit Dress Type' : 'Create Dress Type'}
          </Typography>
        </Box>
        <Button variant="contained" startIcon={<Save />} onClick={handleSave}>
          Save Dress Type
        </Button>
      </PageHeader>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>Basic Information</Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 3 }}>
          <TextField 
            label="Name" fullWidth margin="dense" 
            slotProps={{ htmlInput: { maxLength: 50 } }}
            value={name} onChange={(e) => setName(e.target.value)} 
          />
          <FormControl fullWidth margin="dense">
            <InputLabel>Gender</InputLabel>
            <Select value={gender} label="Gender" onChange={(e) => setGender(e.target.value as 'Male' | 'Female')}>
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
            </Select>
          </FormControl>
          <TextField 
            label="Description" fullWidth margin="dense" multiline rows={2} 
            slotProps={{ htmlInput: { maxLength: 250 } }}
            value={description} onChange={(e) => setDescription(e.target.value)} 
          />
          <FormControl fullWidth margin="dense">
            <InputLabel>Size Chart</InputLabel>
            <Select value={sizeChartId} label="Size Chart" onChange={(e) => setSizeChartId(e.target.value)}>
              {sizeCharts.filter(sc => sc.gender === gender).map(sc => (
                <MenuItem key={sc._id} value={sc._id}>{sc.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Paper>

      <Paper sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6">Design Combinations</Typography>
          <Button variant="outlined" startIcon={<Add />} onClick={() => handleOpenModal(null)}>Add Combination</Button>
        </Box>
        
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 700 }}>Combinations</TableCell>
              <TableCell sx={{ fontWeight: 700, width: 120 }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {designCombinations.length > 0 ? (
              designCombinations.map((combo, comboIdx) => (
                <TableRow key={comboIdx}>
                  <TableCell>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      {combo.designIds.map((designId, designIdx) => (
                        <Chip 
                          key={designIdx} 
                          label={`${getDesignCategoryName(designId)}: ${getDesignName(designId)}`}
                          variant="outlined"
                        />
                      ))}
                    </Box>
                  </TableCell>
                  <TableCell>
                    <IconButton color="info" onClick={() => handleOpenModal(comboIdx)}><Edit fontSize="small" /></IconButton>
                    <IconButton color="error" onClick={() => handleDeleteCombo(comboIdx)}><Delete fontSize="small" /></IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={2} align="center">No combinations added yet.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Paper>

      <Dialog open={modalOpen} onClose={() => setModalOpen(false)} fullWidth maxWidth="md">
        <DialogTitle>{editingComboIndex !== null ? 'Edit' : 'Add'} Design Combination</DialogTitle>
        <DialogContent dividers>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 700 }}>Design Category</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Design</TableCell>
                <TableCell sx={{ fontWeight: 700, width: 80 }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tempRows.map((row, idx) => (
                <TableRow key={idx}>
                  <TableCell>
                    <FormControl fullWidth size="small">
                      <Select 
                        value={String(row.categoryId)} 
                        onChange={(e) => handleUpdateRow(idx, 'categoryId', e.target.value as string)}
                      >
                        <MenuItem value=""><em>Select Category</em></MenuItem>
                        {categories.map(cat => (
                          <MenuItem key={String(cat._id)} value={String(cat._id)}>{cat.name}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </TableCell>
                  <TableCell>
                    <FormControl fullWidth size="small" disabled={!row.categoryId}>
                      <Select 
                        value={String(row.designId)} 
                        onChange={(e) => handleUpdateRow(idx, 'designId', e.target.value as string)}
                      >
                        <MenuItem value=""><em>Select Design</em></MenuItem>
                        {allDesigns
                          .filter(d => {
                            const catId = typeof d.category === 'string' ? d.category : d.category?._id;
                            return String(catId) === String(row.categoryId);
                          })
                          .map(design => (
                            <MenuItem key={String(design._id)} value={String(design._id)}>{design.name}</MenuItem>
                          ))
                        }
                      </Select>
                    </FormControl>
                  </TableCell>
                  <TableCell>
                    <IconButton color="error" size="small" onClick={() => handleRemoveRow(idx)}>
                      <Delete fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Button startIcon={<Add />} onClick={handleAddRow} sx={{ mt: 2 }}>Add Row</Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setModalOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSaveModal}>Apply</Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={!!error} autoHideDuration={6000} onClose={() => setError(null)}>
        <Alert severity="error">{error}</Alert>
      </Snackbar>
    </Box>
  );
};

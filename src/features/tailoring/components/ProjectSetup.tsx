import React, { useState, useEffect, useMemo } from 'react';
import { 
  Box, Typography, Button, TextField, Select, MenuItem, 
  FormControl, InputLabel, Dialog, DialogTitle, DialogContent, 
  DialogActions, Chip, Paper, Table, TableBody, TableCell, 
  TableHead, TableRow, IconButton, Link, CircularProgress, Alert,
  Grid
} from '@mui/material';
import { Close } from '@mui/icons-material';
import { dressTypeService } from '../../config/api/dressType.service';
import { sizeChartService } from '../../config/api/sizeChart.service';
import { designCategoryService } from '../../config/api/designCategory.service';
import { designService } from '../../config/api/design.service';
import { measurementTypeService } from '../../config/api/measurementType.service';
import { DressType, DesignCombination } from '../../config/types/dressType';
import { SizeChart } from '../../config/types/sizeChart';
import { DesignCategory } from '../../config/types/designCategory';
import { IDesign } from '../../config/types/design';
import { MeasurementType } from '../../config/types/measurementType';
import { SizeType } from '../../config/types/sizeType';
import { PatternVisualizer } from '../../visualization/components/PatternVisualizer';
import { ProjectState } from '../../../types/project';

interface Props {
  initialProject?: ProjectState;
  onCancel: () => void;
  onGenerate: (data: any) => void;
}

export const ProjectSetup: React.FC<Props> = ({ initialProject, onCancel, onGenerate }) => {
  // Data State
  const [dressTypes, setDressTypes] = useState<DressType[]>([]);
  const [sizeCharts, setSizeCharts] = useState<SizeChart[]>([]);
  const [categories, setCategories] = useState<DesignCategory[]>([]);
  const [designs, setDesigns] = useState<IDesign[]>([]);
  const [measurementTypes, setMeasurementTypes] = useState<MeasurementType[]>([]);
  const [sizeTypes, setSizeTypes] = useState<SizeType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Selection State
  const [projectName, setProjectName] = useState(initialProject?.name || '');
  const [gender, setGender] = useState<'Male' | 'Female'>(initialProject?.gender || 'Male');
  const [selectedDressTypeId, setSelectedDressTypeId] = useState(initialProject?.dressType || '');
  const [selectedCombinationIndex, setSelectedCombinationIndex] = useState<number | null>(null);
  const [selectedSizeTypeId, setSelectedSizeTypeId] = useState(initialProject?.sizeTypeId || '');
  const [measurements, setMeasurements] = useState<Record<string, number>>({});
  const [unit, setUnit] = useState<'in' | 'cm'>('in');

  // Modals
  const [comboModalOpen, setComboModalOpen] = useState(false);
  const [chartModalOpen, setChartModalOpen] = useState(false);

  useEffect(() => {
    loadInitialData();
  }, []);

  const selectedDressType = useMemo(() => 
    dressTypes.find(dt => dt._id === selectedDressTypeId) || null, 
    [dressTypes, selectedDressTypeId]
  );

  // Initialize measurements and combinations from initialProject once data is loaded
  useEffect(() => {
    if (!loading && initialProject) {
      // Set measurements
      const mtRecord: Record<string, number> = {};
      initialProject.measurements.forEach(m => {
        mtRecord[m.measurementTypeId] = m.value;
      });
      setMeasurements(mtRecord);

      // Find combination index
      if (selectedDressType && initialProject.selectedDesignCombinations?.length > 0) {
        const comboId = String(initialProject.selectedDesignCombinations[0]);
        const idx = selectedDressType.designCombinations.findIndex(c => String(c._id) === comboId);
        if (idx !== -1) setSelectedCombinationIndex(idx);
      }
    }
  }, [loading, initialProject, dressTypes, selectedDressTypeId, selectedDressType]);

  const loadInitialData = async () => {
    setLoading(true);
    try {
      const [dt, sc, cat, des, mt, st] = await Promise.all([
        dressTypeService.getAll().catch(() => []),
        sizeChartService.getAll().catch(() => []),
        designCategoryService.getAll().catch(() => []),
        designService.getAll().catch(() => []),
        measurementTypeService.getAll().catch(() => []),
        sizeChartService.getSizeTypes().catch(() => [])
      ]);
      setDressTypes(dt);
      setSizeCharts(sc);
      setCategories(cat);
      setDesigns(des);
      setMeasurementTypes(mt);
      setSizeTypes(st);
      setError(null);
    } catch (error) {
      console.error('Failed to load project setup data:', error);
      setError('Failed to load configuration data. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  const selectedSizeChart = useMemo(() => {
    if (!selectedDressType) return null;
    const chartId = typeof selectedDressType.sizeChartId === 'string' 
      ? selectedDressType.sizeChartId 
      : selectedDressType.sizeChartId?._id;
    return sizeCharts.find(sc => sc._id === chartId) || null;
  }, [selectedDressType, sizeCharts]);

  const availableSizeTypeIds = useMemo(() => {
    if (!selectedSizeChart?.entries) return [];
    const ids = new Set(selectedSizeChart.entries
      .filter(e => e.unit === unit)
      .map(e => {
        const id = typeof e.sizeTypeId === 'string' ? e.sizeTypeId : (e.sizeTypeId as any)?._id;
        return String(id);
      })
    );
    return Array.from(ids).filter(id => id && id !== 'undefined');
  }, [selectedSizeChart, unit]);

  const getSizeTypeName = (id: string) => sizeTypes.find(st => String(st._id) === id)?.name || id;

  // Handle Size Type Change - Populate measurements
  useEffect(() => {
    if (selectedSizeTypeId && selectedSizeChart && !initialProject) {
      const newMeasurements: Record<string, number> = {};
      selectedSizeChart.entries
        .forEach(e => {
          const eStId = typeof e.sizeTypeId === 'string' ? e.sizeTypeId : (e.sizeTypeId as any)?._id;
          const eMtId = typeof e.measurementTypeId === 'string' ? e.measurementTypeId : (e.measurementTypeId as any)?._id;
          
          if (String(eStId) === selectedSizeTypeId) {
            let val = e.value;
            val = convertValue(val, (e.unit as 'in' | 'cm') || 'cm', unit);
            newMeasurements[String(eMtId)] = Number(val.toFixed(2));
          }
        });
      setMeasurements(newMeasurements);
    }
  }, [selectedSizeTypeId, selectedSizeChart, unit, initialProject]);

  const getCategoryName = (id: string) => categories.find(c => String(c._id) === String(id))?.name || id;
  const getDesignName = (id: string) => designs.find(d => String(d._id) === String(id))?.name || id;

  const getDesignCategoryName = (designId: string) => {
    const design = designs.find(d => String(d._id) === String(designId));
    if (!design) return '';
    const catId = typeof design.category === 'string' ? design.category : design.category?._id;
    return getCategoryName(String(catId));
  };

  const handleSave = () => {
    const selectedCombo = selectedCombinationIndex !== null ? selectedDressType?.designCombinations[selectedCombinationIndex] : null;
    const selectedComboId = selectedCombo?._id ? String(selectedCombo._id) : null;

    onGenerate({
      id: initialProject?.id,
      name: projectName,
      gender,
      dressType: selectedDressTypeId,
      selectedDesignCombinations: selectedComboId ? [selectedComboId] : [],
      sizeTypeId: selectedSizeTypeId,
      measurements: Object.entries(measurements).map(([mtId, val]) => ({
        measurementTypeId: mtId,
        value: val
      }))
    });
  };

  const convertValue = (val: number, fromUnit: 'in' | 'cm', toUnit: 'in' | 'cm') => {
    if (fromUnit === toUnit) return val;
    if (fromUnit === 'cm' && toUnit === 'in') return val / 2.54;
    return val * 2.54;
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 4, height: '100vh', display: 'flex', flexDirection: 'column', bgcolor: '#f5f5f5' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          {initialProject ? 'Edit Project' : 'New Project'}
        </Typography>
        <IconButton onClick={onCancel}><Close /></IconButton>
      </Box>

      {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

      <Grid container spacing={4} sx={{ flex: 1, overflow: 'hidden' }}>
        {/* Left Side: Form */}
        <Grid item xs={12} md={6} sx={{ overflowY: 'auto', height: '100%' }}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>General Info</Typography>
            <TextField 
              label="Project Name" fullWidth margin="dense" 
              value={projectName} onChange={(e) => setProjectName(e.target.value)} 
            />
            
            <FormControl fullWidth margin="dense">
              <InputLabel>Gender</InputLabel>
              <Select value={gender} label="Gender" onChange={(e) => {
                setGender(e.target.value as 'Male' | 'Female');
                setSelectedDressTypeId('');
                setSelectedCombinationIndex(null);
                setSelectedSizeTypeId('');
                setMeasurements({});
              }}>
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth margin="dense" disabled={!gender}>
              <InputLabel>Dress Type</InputLabel>
              <Select 
                value={selectedDressTypeId} 
                label="Dress Type" 
                onChange={(e) => {
                  setSelectedDressTypeId(e.target.value);
                  setSelectedCombinationIndex(null);
                  setSelectedSizeTypeId('');
                  setMeasurements({});
                }}
              >
                {dressTypes.filter(dt => dt.gender === gender).map(dt => (
                  <MenuItem key={dt._id} value={dt._id}>{dt.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Paper>

          {selectedDressType && (
            <>
              <Paper sx={{ p: 3, mb: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="h6">Design Combinations</Typography>
                  <Link component="button" onClick={() => setComboModalOpen(true)}>Select design combinations</Link>
                </Box>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {selectedCombinationIndex !== null && selectedDressType.designCombinations[selectedCombinationIndex]?.designIds.map(dId => (
                    <Chip key={dId} size="small" variant="filled" label={`${getDesignCategoryName(dId)}:${getDesignName(dId)}`} sx={{ bgcolor: '#e3f2fd' }} />
                  ))}
                </Box>
              </Paper>

              <Paper sx={{ p: 3, mb: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="h6">Size & Measurements</Typography>
                  <Link component="button" onClick={() => setChartModalOpen(true)}>View Size Chart</Link>
                </Box>
                
                <FormControl fullWidth size="small" sx={{ mb: 3 }}>
                  <InputLabel>Standard Size</InputLabel>
                  <Select 
                    value={selectedSizeTypeId} 
                    label="Standard Size"
                    onChange={(e) => setSelectedSizeTypeId(e.target.value)}
                  >
                    {availableSizeTypeIds.map(stId => (
                      <MenuItem key={stId} value={stId}>{getSizeTypeName(stId)}</MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
                  {measurementTypes.map(mt => (
                    <TextField 
                      key={mt._id}
                      label={mt.name}
                      size="small"
                      type="number"
                      value={measurements[mt._id!] || ''}
                      onChange={(e) => setMeasurements({...measurements, [mt._id!]: Number(e.target.value)})}
                      InputProps={{ endAdornment: <Typography variant="caption">{unit}</Typography> }}
                    />
                  ))}
                </Box>
              </Paper>
            </>
          )}

          <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
            <Button variant="contained" color="primary" fullWidth size="large" onClick={handleSave} disabled={!projectName || !selectedDressTypeId}>
              Save Project
            </Button>
            <Button variant="outlined" fullWidth size="large" onClick={onCancel}>
              Cancel
            </Button>
          </Box>
        </Grid>

        {/* Right Side: Visualizer */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ height: '100%', bgcolor: '#000', borderRadius: 2, overflow: 'hidden', position: 'relative' }}>
            <PatternVisualizer 
              measurements={measurements} 
              measurementTypes={measurementTypes}
            />
            <Box sx={{ position: 'absolute', bottom: 20, left: 20, color: '#fff' }}>
              <Typography variant="h6" sx={{ opacity: 0.8 }}>Real-time Blueprint</Typography>
              <Typography variant="caption" sx={{ opacity: 0.6 }}>Technical draft updates immediately</Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Design Combination Modal */}
      <Dialog open={comboModalOpen} onClose={() => setComboModalOpen(false)} fullWidth maxWidth="md">
        <DialogTitle>Select Design Combination</DialogTitle>
        <DialogContent dividers>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Designs</TableCell>
                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {selectedDressType?.designCombinations.map((combo, idx) => (
                <TableRow key={idx}>
                  <TableCell>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      {combo.designIds.map(dId => (
                        <Chip key={dId} size="small" label={`${getDesignCategoryName(dId)}:${getDesignName(dId)}`} />
                      ))}
                    </Box>
                  </TableCell>
                  <TableCell align="right">
                    <Button 
                      size="small" 
                      variant="outlined"
                      onClick={() => {
                        setSelectedCombinationIndex(idx);
                        setComboModalOpen(false);
                      }}
                    >
                      Select
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </DialogContent>
      </Dialog>

      {/* Size Chart Modal */}
      <Dialog open={chartModalOpen} onClose={() => setChartModalOpen(false)} fullWidth maxWidth="lg">
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          Size Chart: {selectedSizeChart?.name || 'N/A'}
          <FormControl size="small" sx={{ width: 200 }}>
            <InputLabel>Metric Unit</InputLabel>
            <Select 
              value={unit} 
              label="Metric Unit"
              onChange={(e) => setUnit(e.target.value as 'in' | 'cm')}
            >
              <MenuItem value="in">Inch (in)</MenuItem>
              <MenuItem value="cm">Centimeter (cm)</MenuItem>
            </Select>
          </FormControl>
        </DialogTitle>
        <DialogContent dividers>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 700 }}>Size Type</TableCell>
                {measurementTypes.map(mt => (
                  <TableCell key={mt._id} sx={{ fontWeight: 700 }}>{mt.name}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {availableSizeTypeIds.map(stId => (
                <TableRow key={stId}>
                  <TableCell sx={{ fontWeight: 700 }}>{getSizeTypeName(stId)}</TableCell>
                  {measurementTypes.map(mt => {
                    const entry = selectedSizeChart?.entries.find(e => {
                      const eStId = typeof e.sizeTypeId === 'string' ? e.sizeTypeId : (e.sizeTypeId as any)?._id;
                      const eMtId = typeof e.measurementTypeId === 'string' ? e.measurementTypeId : (e.measurementTypeId as any)?._id;
                      return String(eStId) === stId && String(eMtId) === String(mt._id) && e.unit === unit;
                    });
                    const val = entry?.value || 0;
                    return <TableCell key={mt._id}>{val.toFixed(2)}</TableCell>;
                  })}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setChartModalOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

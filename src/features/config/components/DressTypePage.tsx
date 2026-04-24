import React, { useState, useEffect } from 'react';
import { 
  Typography, Table, TableBody, TableCell, TableHead, TableRow, 
  Button, Box, Alert, Snackbar, IconButton
} from '@mui/material';
import { Add, Edit, Delete } from '@mui/icons-material';
import { DressType } from '../types/dressType';
import { SizeChart } from '../types/sizeChart';
import { dressTypeService } from '../api/dressType.service';
import { PageHeader, StyledTableContainer } from '../styles/measurementType.styles';

interface Props {
  onEdit: (dressType: DressType | null) => void;
}

export const DressTypePage: React.FC<Props> = ({ onEdit }) => {
  const [dressTypes, setDressTypes] = useState<DressType[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const dressData = await dressTypeService.getAll();
      setDressTypes(dressData);
    } catch (err) {
      setError('Failed to load data');
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

  return (
    <Box sx={{ p: 4 }}>
      <PageHeader>
        <Typography variant="h4" sx={{ fontWeight: 700 }}>Dress Types</Typography>
        <Button variant="contained" startIcon={<Add />} onClick={() => onEdit(null)}>Add Dress Type</Button>
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
                        <IconButton color="info" onClick={() => onEdit(dt)}><Edit fontSize="small" /></IconButton>
                        <IconButton color="error" onClick={() => handleDelete(dt._id!)}><Delete fontSize="small" /></IconButton>
                    </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </StyledTableContainer>

      <Snackbar open={!!error} autoHideDuration={6000} onClose={() => setError(null)}>
        <Alert severity="error">{error}</Alert>
      </Snackbar>
    </Box>
  );
};

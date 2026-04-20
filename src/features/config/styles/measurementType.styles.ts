import { styled } from '@mui/material/styles';
import { Box, Card, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, IconButton, TextField, Button, Typography } from '@mui/material';

export const PageHeader = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(4),
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}));

export const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  backgroundColor: '#fff',
  borderRadius: theme.spacing(1.5),
  boxShadow: theme.shadows[1],
}));

export const FormCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(4),
  backgroundColor: '#fff',
}));

export const FormActions = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(2),
  marginTop: theme.spacing(3),
  justifyContent: 'flex-end',
}));

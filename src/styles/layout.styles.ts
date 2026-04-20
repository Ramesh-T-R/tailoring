import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

export const AppContainer = styled(Box)(() => ({
  display: 'flex',
  minHeight: '100vh',
}));

export const MainContent = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  minHeight: '100vh',
  backgroundColor: theme.palette.background.default,
})) as typeof Box;

export const ConfigPlaceholderContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4),
}));

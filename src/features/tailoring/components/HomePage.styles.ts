import { styled } from '@mui/material/styles';
import { Box, AppBar, Toolbar, Card } from '@mui/material';

export const HomeRoot = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  minHeight: '100vh',
}));

export const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: 'transparent',
  boxShadow: 'none',
  paddingTop: theme.spacing(2),
}));

export const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  backgroundColor: 'rgba(255,255,255,0.8)',
  backdropFilter: 'blur(8px)',
  borderRadius: theme.spacing(1.5),
  boxShadow: theme.shadows[1],
  color: '#344767',
  justifyContent: 'space-between',
}));

export const NavbarBrand = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
}));

export const NavbarActions = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
}));

export const WelcomeHeader = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(4),
}));

export const EmptyStateCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(8),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  border: '1px dashed #ced4da',
  backgroundColor: 'transparent',
  boxShadow: 'none',
}));

export const ProjectCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(3),
  cursor: 'pointer',
  transition: '0.3s',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: theme.shadows[6],
  },
}));

export const CardHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: theme.spacing(2),
}));

export const DressTypeBadge = styled(Box)(({ theme }) => ({
  padding: `${theme.spacing(0.5)} ${theme.spacing(1.5)}`,
  backgroundColor: theme.palette.primary.main,
  borderRadius: theme.spacing(1),
  backgroundImage: 'linear-gradient(195deg, #49a3f1, #1A73E8)',
}));

export const VersionBadge = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(0.5),
  color: theme.palette.text.secondary,
}));

export const CardFooter = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}));

export const FooterSection = styled(Box)(({ theme }) => ({
  marginTop: 'auto',
  padding: theme.spacing(4),
  textAlign: 'center',
}));

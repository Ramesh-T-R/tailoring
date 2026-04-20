import { styled } from '@mui/material/styles';
import { Box, Drawer, ListItemButton, ListItemIcon, Typography, Divider } from '@mui/material';

const drawerWidth = 260;

export const StyledDrawer = styled(Drawer)(() => ({
  width: drawerWidth,
  flexShrink: 0,
  '& .MuiDrawer-paper': { 
    width: drawerWidth, 
    boxSizing: 'border-box',
    backgroundColor: '#1f283e',
    color: '#fff',
    border: 'none',
    boxShadow: '0.25rem 0.25rem 0.625rem rgba(0,0,0,0.1)'
  },
}));

export const LogoSection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
}));

export const LogoIcon = styled(Box)(() => ({
  width: 32,
  height: 32,
  borderRadius: 4,
  background: 'linear-gradient(195deg, #49a3f1, #1A73E8)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

export const LogoTitle = styled(Typography)(() => ({
  fontWeight: 700,
  letterSpacing: 0.5,
}));

export const SidebarDivider = styled(Divider)(() => ({
  borderColor: 'rgba(255,255,255,0.1)',
  marginBottom: '1rem',
}));

export const NavListItemButton = styled(ListItemButton)<{ active?: boolean }>(({ theme, active }) => ({
  borderRadius: theme.spacing(1),
  marginBottom: theme.spacing(0.5),
  color: active ? '#fff' : 'rgba(255,255,255,0.8)',
  backgroundColor: active ? theme.palette.primary.main : 'transparent',
  '&:hover': {
    backgroundColor: active ? theme.palette.primary.main : 'rgba(255,255,255,0.05)',
  },
}));

export const SubNavListItemButton = styled(ListItemButton)(({ theme }) => ({
  borderRadius: theme.spacing(1),
  marginBottom: theme.spacing(0.5),
  color: 'rgba(255,255,255,0.6)',
  '&:hover': {
    backgroundColor: 'rgba(255,255,255,0.05)',
    color: '#fff',
  },
}));

export const NavListItemIcon = styled(ListItemIcon)(() => ({
  color: 'inherit',
  minWidth: 40,
}));

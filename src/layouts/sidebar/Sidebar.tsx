import React from 'react';
import { List, ListItem, ListItemText, Collapse } from '@mui/material';
import { 
  Settings, ExpandLess, ExpandMore, Straighten, GridOn, 
  Checkroom, Layers, ContentCut, Folder 
} from '@mui/icons-material';
import { useSidebarLogic } from './useSidebarLogic';
import { 
  StyledDrawer, LogoSection, LogoIcon, LogoTitle, SidebarDivider,
  NavListItemButton, SubNavListItemButton, NavListItemIcon
} from './Sidebar.styles';

interface Props {
  onNavigate: (view: string) => void;
}

export const Sidebar: React.FC<Props> = ({ onNavigate }) => {
  const { openConfig, openTailoring, toggleConfig, toggleTailoring } = useSidebarLogic();

  return (
    <StyledDrawer variant="permanent">
      <LogoSection>
        <LogoIcon>
          <ContentCut sx={{ color: '#fff', fontSize: 18 }} />
        </LogoIcon>
        <LogoTitle variant="h6">
          Thaiyalagam
        </LogoTitle>
      </LogoSection>

      <SidebarDivider />

      <List sx={{ px: 2 }}>
        {/* Configurations Menu */}
        <ListItem disablePadding sx={{ display: 'block' }}>
          <NavListItemButton onClick={toggleConfig}>
            <NavListItemIcon>
              <Settings fontSize="small" />
            </NavListItemIcon>
            <ListItemText 
              primary="Configurations" 
              slotProps={{ primary: { sx: { fontSize: '0.875rem', fontWeight: 500 } } }} 
            />
            {openConfig ? <ExpandLess fontSize="small" /> : <ExpandMore fontSize="small" />}
          </NavListItemButton>
          
          <Collapse in={openConfig} timeout="auto" unmountOnExit>
            <List component="div" disablePadding sx={{ pl: 2 }}>
              {[
                { label: 'Measurement Types', icon: <Straighten fontSize="small" />, view: 'config-measurements' },
                { label: 'Size Charts', icon: <GridOn fontSize="small" />, view: 'config-sizes' },
                { label: 'Dress Types', icon: <Checkroom fontSize="small" />, view: 'config-dresses' },
                { label: 'Dress Part Types', icon: <Layers fontSize="small" />, view: 'config-parts' },
              ].map((item) => (
                <SubNavListItemButton 
                  key={item.label}
                  onClick={() => onNavigate(item.view)}
                >
                  <NavListItemIcon>
                    {item.icon}
                  </NavListItemIcon>
                  <ListItemText 
                    primary={item.label} 
                    slotProps={{ primary: { sx: { fontSize: '0.8125rem' } } }} 
                  />
                </SubNavListItemButton>
              ))}
            </List>
          </Collapse>
        </ListItem>

        {/* Tailoring Menu */}
        <ListItem disablePadding sx={{ display: 'block', mt: 2 }}>
          <NavListItemButton onClick={toggleTailoring}>
            <NavListItemIcon>
              <ContentCut fontSize="small" />
            </NavListItemIcon>
            <ListItemText 
              primary="Tailoring" 
              slotProps={{ primary: { sx: { fontSize: '0.875rem', fontWeight: 500 } } }} 
            />
            {openTailoring ? <ExpandLess fontSize="small" /> : <ExpandMore fontSize="small" />}
          </NavListItemButton>
          
          <Collapse in={openTailoring} timeout="auto" unmountOnExit>
            <List component="div" disablePadding sx={{ pl: 2 }}>
              <SubNavListItemButton onClick={() => onNavigate('home')}>
                <NavListItemIcon>
                  <Folder fontSize="small" />
                </NavListItemIcon>
                <ListItemText 
                  primary="Projects" 
                  slotProps={{ primary: { sx: { fontSize: '0.8125rem' } } }} 
                />
              </SubNavListItemButton>
            </List>
          </Collapse>
        </ListItem>
      </List>
    </StyledDrawer>
  );
};

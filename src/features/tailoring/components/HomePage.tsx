import React from 'react';
import { ProjectState } from '../../../types/project';
import { 
  Grid, Typography, Button, IconButton, 
  Container, Avatar, Divider
} from '@mui/material';
import { 
  Add, Folder, Schedule, ChevronRight, DesignServices, 
  Notifications, Person, Search
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import {
  HomeRoot, StyledAppBar, StyledToolbar, NavbarBrand, NavbarActions,
  WelcomeHeader, EmptyStateCard, ProjectCard, CardHeader, DressTypeBadge,
  VersionBadge, CardFooter, FooterSection
} from './HomePage.styles';

interface Props {
  projects: ProjectState[];
  onCreateNew: () => void;
  onOpenProject: (project: ProjectState) => void;
}

export const HomePage: React.FC<Props> = ({ projects, onCreateNew, onOpenProject }) => {
  return (
    <HomeRoot>
      {/* Navbar */}
      <StyledAppBar position="static">
        <Container maxWidth="xl">
          <StyledToolbar>
            <NavbarBrand>
              <DesignServices color="primary" />
              <Typography variant="h6" sx={{ fontWeight: 700 }}>Guild Admin</Typography>
            </NavbarBrand>
            
            <NavbarActions>
              <IconButton size="small"><Search /></IconButton>
              <IconButton size="small"><Notifications /></IconButton>
              <IconButton size="small"><Person /></IconButton>
              <Button variant="contained" size="small" onClick={onCreateNew} startIcon={<Add />}>
                New Project
              </Button>
            </NavbarActions>
          </StyledToolbar>
        </Container>
      </StyledAppBar>

      <Container maxWidth="xl" sx={{ mt: 6, pb: 6 }}>
        {/* Welcome Header */}
        <WelcomeHeader>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>Welcome back, Master Ramesh</Typography>
          <Typography variant="body1" color="textSecondary">Manage your bespoke collections and technical blueprints.</Typography>
        </WelcomeHeader>

        {/* Project Grid */}
        <Grid container spacing={3}>
          {projects.length === 0 ? (
            <Grid size={{ xs: 12 }}>
              <EmptyStateCard>
                <Folder sx={{ fontSize: 64, color: '#dee2e6', mb: 2 }} />
                <Typography variant="h6" color="textSecondary">No projects yet</Typography>
                <Button variant="text" onClick={onCreateNew} sx={{ mt: 1 }}>Start your first project</Button>
              </EmptyStateCard>
            </Grid>
          ) : (
            projects.map((project) => (
              <Grid size={{ xs: 12, md: 6, lg: 4 }} key={project.id}>
                <ProjectCard onClick={() => onOpenProject(project)}>
                  <CardHeader>
                    <DressTypeBadge>
                      <Typography variant="caption" sx={{ color: '#fff', fontWeight: 700, textTransform: 'uppercase' }}>
                        {project.dressType}
                      </Typography>
                    </DressTypeBadge>
                    <VersionBadge>
                      <Schedule sx={{ fontSize: 14 }} />
                      <Typography variant="caption" sx={{ fontWeight: 700 }}>v{project.version}</Typography>
                    </VersionBadge>
                  </CardHeader>
                  
                  <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>{project.name}</Typography>
                  <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>Customer: {project.customerName}</Typography>
                  
                  <Divider sx={{ my: 2 }} />
                  
                  <CardFooter>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Avatar sx={{ width: 24, height: 24, fontSize: 10, bgcolor: '#7b809a' }}>{project.gender[0]}</Avatar>
                      <Typography variant="caption" sx={{ mt: 0.5, fontWeight: 700 }}>{project.measurements.chest}cm Chest</Typography>
                    </Box>
                    <ChevronRight color="disabled" />
                  </CardFooter>
                </ProjectCard>
              </Grid>
            ))
          )}
        </Grid>
      </Container>

      {/* Footer */}
      <FooterSection>
        <Typography variant="caption" color="textSecondary">
          © 2026 Thaiyalagam. Built with Material Dashboard 2.
        </Typography>
        <Box sx={{ mt: 1, display: 'flex', justifyContent: 'center', gap: 3 }}>
          <Typography variant="caption" sx={{ fontWeight: 700, cursor: 'pointer' }}>Documentation</Typography>
          <Typography variant="caption" sx={{ fontWeight: 700, cursor: 'pointer' }}>License</Typography>
          <Typography variant="caption" sx={{ fontWeight: 700, cursor: 'pointer' }}>Guild Hub</Typography>
        </Box>
      </FooterSection>
    </HomeRoot>
  );
};

// Internal Box for footer links since it's simple
const Box = styled('div')(() => ({}));

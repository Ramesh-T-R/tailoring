import React from 'react';
import { 
  Typography, Table, TableBody, TableCell, TableHead, TableRow, 
  Button, Box, IconButton, Paper, Tooltip
} from '@mui/material';
import { Add, Edit, Delete, FolderOpen } from '@mui/icons-material';
import { ProjectState } from '../../../types/project';
import { PageHeader, StyledTableContainer } from '../../config/styles/measurementType.styles';

interface Props {
  projects: ProjectState[];
  onCreateNew: () => void;
  onEditProject: (project: ProjectState) => void;
  onDeleteProject: (id: string) => void;
}

export const HomePage: React.FC<Props> = ({ projects, onCreateNew, onEditProject, onDeleteProject }) => {
  return (
    <Box sx={{ p: 4 }}>
      <PageHeader>
        <Typography variant="h4" sx={{ fontWeight: 700 }}>Projects</Typography>
        <Button 
          variant="contained" 
          startIcon={<Add />} 
          onClick={onCreateNew}
        >
          New Project
        </Button>
      </PageHeader>

      <StyledTableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 700 }}>Project Name</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Gender</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Dress Type</TableCell>
              <TableCell sx={{ fontWeight: 700, width: 120 }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {projects.length > 0 ? (
              projects.map((project) => (
                <TableRow 
                  key={project.id} 
                  hover 
                  sx={{ cursor: 'pointer' }} 
                  onClick={() => onEditProject(project)}
                >
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <FolderOpen fontSize="small" color="primary" />
                      {project.name}
                    </Box>
                  </TableCell>
                  <TableCell>{project.gender}</TableCell>
                  <TableCell>{project.dressType}</TableCell>
                  <TableCell onClick={(e) => e.stopPropagation()}>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Tooltip title="Edit Project">
                        <IconButton 
                          color="primary" 
                          size="small" 
                          onClick={() => onEditProject(project)}
                        >
                          <Edit fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete Project">
                        <IconButton 
                          color="error" 
                          size="small" 
                          onClick={() => {
                            if (window.confirm('Are you sure you want to delete this project?')) {
                              onDeleteProject(project.id);
                            }
                          }}
                        >
                          <Delete fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} align="center" sx={{ py: 8 }}>
                  <Typography variant="body1" color="textSecondary">
                    No projects found. Create your first project to get started!
                  </Typography>
                  <Button 
                    variant="text" 
                    startIcon={<Add />} 
                    onClick={onCreateNew}
                    sx={{ mt: 1 }}
                  >
                    Create Project
                  </Button>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </StyledTableContainer>
    </Box>
  );
};

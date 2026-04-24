import React from 'react';
import { HomePage } from './features/tailoring/components/HomePage';
import { ProjectDashboard } from './features/tailoring/components/ProjectDashboard';
import { ProjectSetup } from './features/tailoring/components/ProjectSetup';
import { MeasurementTypePage } from './features/config/components/MeasurementTypePage';
import { SizeChartPage } from './features/config/components/SizeChartPage';
import { DressTypePage } from './features/config/components/DressTypePage';
import { DesignCategoryPage } from './features/config/components/DesignCategoryPage';
import { DesignPage } from './features/config/components/DesignPage';
import { DressTypeForm } from './features/config/components/DressTypeForm';
import { Sidebar } from './layouts/sidebar/Sidebar';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Typography } from '@mui/material';
import { theme } from './styles/theme';
import { useAppLogic } from './features/tailoring/hooks/useAppLogic';
import { AppContainer, MainContent, ConfigPlaceholderContainer } from './styles/layout.styles';

function App() {
  const {
    view,
    setView,
    projects,
    currentProject,
    currentEditingDressType,
    handleCreateNew,
    handleGenerate,
    handleEditProject,
    handleDeleteProject,
    handleNavigate,
    handleEditDressType,
    loadProjects
  } = useAppLogic();

  const renderConfigPlaceholder = (title: string) => (
    <ConfigPlaceholderContainer>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>{title}</Typography>
      <Typography variant="body1">Technical configuration for {title.toLowerCase()} will be managed here.</Typography>
    </ConfigPlaceholderContainer>
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppContainer>
        <Sidebar onNavigate={handleNavigate} />
        
        <MainContent component="main">
          {view === 'home' && (
            <HomePage 
              projects={projects} 
              onCreateNew={handleCreateNew} 
              onEditProject={handleEditProject}
              onDeleteProject={handleDeleteProject}
            />
          )}
          
          {view === 'setup' && (
            <ProjectSetup 
              onCancel={() => setView('home')} 
              onGenerate={handleGenerate} 
            />
          )}

          {view === 'studio' && currentProject && (
            <ProjectSetup 
              initialProject={currentProject} 
              onCancel={() => setView('home')} 
              onGenerate={handleGenerate} 
            />
          )}

          {view === 'config-measurements' && <MeasurementTypePage />}
          {view === 'config-sizes' && <SizeChartPage />}
          {view === 'config-dresses' && <DressTypePage onEdit={handleEditDressType} />}
          {view === 'config-parts' && <DesignCategoryPage />}
          {view === 'designs' && <DesignPage />}
          {view === 'config-dress-edit' && (
            <DressTypeForm 
              initialData={currentEditingDressType} 
              onSave={() => setView('config-dresses')}
              onCancel={() => setView('config-dresses')}
            />
          )}
        </MainContent>
      </AppContainer>
    </ThemeProvider>
  );
}

export default App;

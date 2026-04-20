import React from 'react';
import { HomePage } from './features/tailoring/components/HomePage';
import { ProjectDashboard } from './features/tailoring/components/ProjectDashboard';
import { ProjectSetup } from './features/tailoring/components/ProjectSetup';
import { MeasurementTypePage } from './features/config/components/MeasurementTypePage';
import { SizeChartPage } from './features/config/components/SizeChartPage';
import { DressTypePage } from './features/config/components/DressTypePage';
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
    handleCreateNew,
    handleGenerate,
    handleOpenProject,
    handleNavigate,
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
              onOpenProject={handleOpenProject}
            />
          )}
          
          {view === 'setup' && (
            <ProjectSetup 
              onCancel={() => setView('home')} 
              onGenerate={handleGenerate} 
            />
          )}

          {view === 'studio' && currentProject && (
            <ProjectDashboard 
              initialProject={currentProject} 
              onExit={() => setView('home')} 
            />
          )}

          {view === 'config-measurements' && <MeasurementTypePage />}
          {view === 'config-sizes' && <SizeChartPage />}
          {view === 'config-dresses' && <DressTypePage />}
          {view === 'config-parts' && renderConfigPlaceholder('Dress Part Types')}
        </MainContent>
      </AppContainer>
    </ThemeProvider>
  );
}

export default App;

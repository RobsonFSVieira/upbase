import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import { useHelp } from '../../../contexts/HelpContext';
import { ViewPreferencesProvider } from '../../../contexts/ViewPreferencesContext';
import PageHeader from '../../../components/common/PageHeader';
import NavigationTabs from './components/NavigationTabs';

const AvaliacoesDesempenho = () => {
  const { showHelp } = useHelp();

  return (
    <ViewPreferencesProvider>
      <Box sx={{ width: '100%' }}>
        <PageHeader
          title="Desempenho"
          helpText="Central de Avaliações de Desempenho"
        />

        <NavigationTabs />

        <Box sx={{ py: 2 }}>
          <Outlet />
        </Box>
      </Box>
    </ViewPreferencesProvider>
  );
};

export default AvaliacoesDesempenho;
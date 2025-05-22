import React, { useState } from 'react';
import { Box, Tabs, Tab } from '@mui/material';
import StatusAvaliacoes from './components/StatusAvaliacoes';
import GerenciamentoAvaliacoes from './components/GerenciamentoAvaliacoes';
import ModeloFormularios from './components/ModeloFormularios';
import { FormsProvider } from '../../../contexts/FormsContext';

const AvaliacoesDesempenho = () => {
  const [currentTab, setCurrentTab] = useState(0);

  return (
    <FormsProvider>
      <Box>
        <Tabs value={currentTab} onChange={(_, newValue) => setCurrentTab(newValue)}>
          <Tab label="Status Avaliações" />
          <Tab label="Gerenciamento" />
          <Tab label="Modelo de Formulários" />
        </Tabs>

        {currentTab === 0 && <StatusAvaliacoes />}
        {currentTab === 1 && <GerenciamentoAvaliacoes />}
        {currentTab === 2 && <ModeloFormularios />}
      </Box>
    </FormsProvider>
  );
};

export default AvaliacoesDesempenho;
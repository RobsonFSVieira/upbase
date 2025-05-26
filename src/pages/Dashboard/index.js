import React from 'react';
import { Box, Grid } from '@mui/material';
import PageHeader from '../../components/common/PageHeader';
import { mockData } from '../../services/mockData';

const Dashboard = () => {
  const { dashboardStats } = mockData;

  return (
    <Box>
      <PageHeader 
        title="Dashboard"
        helpText="Visão geral do sistema"
      />
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Box sx={{ p: 2, bgcolor: 'background.paper', borderRadius: 1 }}>
            <h3>Avaliações Pendentes</h3>
            <p>Total: {dashboardStats.avaliacoesPendentes}</p>
            <p>Urgentes: {dashboardStats.avaliacoesUrgentes}</p>
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <Box sx={{ p: 2, bgcolor: 'background.paper', borderRadius: 1 }}>            <h3>Últimos Resultados</h3>
            {dashboardStats?.ultimosResultados?.map(resultado => (
              <p key={resultado.colaborador}>
                {resultado.colaborador}: {resultado.nota}
              </p>
            )) || <p>Nenhum resultado recente</p>}
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <Box sx={{ p: 2, bgcolor: 'background.paper', borderRadius: 1 }}>
            <h3>Feedbacks Recentes</h3>
            {dashboardStats?.feedbacksRecentes?.map(feedback => (
              <p key={`${feedback.de}-${feedback.data}`}>
                {feedback.de} - {feedback.tipo}
              </p>
            )) || <p>Nenhum feedback recente</p>}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;

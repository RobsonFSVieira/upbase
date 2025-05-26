import React from 'react';
import { Box, Grid, Paper, Typography } from '@mui/material';
import CicloAvaliacaoCard from '../../../components/Avaliacoes/CicloAvaliacaoCard';
import AvaliacoesPendentesTable from '../../../components/Avaliacoes/AvaliacoesPendentesTable';
import { mockData } from '../../../services/mockData';

const StatusAvaliacoes = () => {
  const { avaliacoes } = mockData;

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <CicloAvaliacaoCard />
      </Grid>
      <Grid item xs={12}>
        <AvaliacoesPendentesTable />
      </Grid>
      <Grid item xs={12}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>Avaliações Pendentes</Typography>
          {avaliacoes.pendentes.map(av => (
            <Box key={av.id} sx={{ p: 1, borderBottom: '1px solid #eee' }}>
              <Typography>{av.colaborador}</Typography>
              <Typography variant="body2" color="text.secondary">
                Turno {av.turno} - {av.tipo} - Prazo: {av.prazo}
              </Typography>
            </Box>
          ))}
        </Paper>
      </Grid>
    </Grid>
  );
};

export default StatusAvaliacoes;

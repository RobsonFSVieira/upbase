import React from 'react';
import { Card, CardContent, Typography, Box, LinearProgress, Chip, Grid } from '@mui/material';

const CicloAvaliacaoCard = () => {
  // Dados mockados - em produção viriam do contexto ou props
  const cicloAtual = {
    nome: "Ciclo de Avaliação 2024.1",
    dataInicio: "01/01/2024",
    dataFim: "30/06/2024",
    progresso: 65,
    status: "em_andamento",
    totalAvaliacoes: 90,
    avaliacoesCompletadas: 58,
    avaliacoesPendentes: 32
  };

  return (
    <Card>
      <CardContent>
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            {cicloAtual.nome}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Período: {cicloAtual.dataInicio} - {cicloAtual.dataFim}
          </Typography>
        </Box>

        <Box sx={{ mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Typography variant="body2" sx={{ mr: 1 }}>
              Progresso Geral:
            </Typography>
            <Typography variant="body2" color="primary">
              {cicloAtual.progresso}%
            </Typography>
          </Box>
          <LinearProgress 
            variant="determinate" 
            value={cicloAtual.progresso}
            sx={{ height: 8, borderRadius: 1 }}
          />
        </Box>

        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Box textAlign="center">
              <Typography variant="h4" color="primary">
                {cicloAtual.totalAvaliacoes}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box textAlign="center">
              <Typography variant="h4" color="success.main">
                {cicloAtual.avaliacoesCompletadas}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Completadas
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box textAlign="center">
              <Typography variant="h4" color="warning.main">
                {cicloAtual.avaliacoesPendentes}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Pendentes
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default CicloAvaliacaoCard;

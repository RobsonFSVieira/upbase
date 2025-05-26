import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  LinearProgress,
  Chip,
  CircularProgress,
  Alert
} from '@mui/material';
import { performanceService } from '../../../../services/performanceService';

const StatusAvaliacoes = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({
    progressoGeral: 0,
    pendentes: 0,
    concluidas: 0,
    emAndamento: 0,
    insights: []
  });

  useEffect(() => {
    const carregarDados = async () => {
      try {
        setLoading(true);
        const avaliacoes = await performanceService.getAll();
        
        // Calcular estatísticas
        const total = avaliacoes.length;
        const concluidas = avaliacoes.filter(av => av.status === 'concluida').length;
        const pendentes = avaliacoes.filter(av => av.status === 'pendente').length;
        const emAndamento = total - (concluidas + pendentes);
        
        setStats({
          progressoGeral: total > 0 ? Math.round((concluidas / total) * 100) : 0,
          pendentes,
          concluidas,
          emAndamento,
          insights: [
            `${concluidas} avaliações concluídas de um total de ${total}`,
            pendentes > 0 ? `${pendentes} avaliações pendentes precisam de atenção` : 'Todas as avaliações estão em dia'
          ]
        });
      } catch (err) {
        console.error('Erro ao carregar dados:', err);
        setError('Não foi possível carregar as estatísticas. Por favor, tente novamente.');
      } finally {
        setLoading(false);
      }
    };

    carregarDados();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" p={3}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box p={3}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Box>
      <Grid container spacing={3}>
        {/* Progresso Geral */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Progresso Geral - Ciclo Atual
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <LinearProgress 
                  variant="determinate" 
                  value={stats.progressoGeral} 
                  sx={{ flex: 1, mr: 2 }} 
                />
                <Typography variant="body2" color="textSecondary">
                  {stats.progressoGeral}%
                </Typography>
              </Box>
              <Grid container spacing={2}>
                <Grid item>
                  <Chip label={`${stats.pendentes} Pendentes`} color="warning" />
                </Grid>
                <Grid item>
                  <Chip label={`${stats.concluidas} Concluídas`} color="success" />
                </Grid>
                <Grid item>
                  <Chip label={`${stats.emAndamento} Em Andamento`} color="info" />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Insights e Notificações */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Insights
              </Typography>
              {stats.insights.map((insight, index) => (
                <Typography key={index} variant="body2" color="textSecondary" paragraph>
                  • {insight}
                </Typography>
              ))}
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Ações Necessárias
              </Typography>
              <Typography variant="body2" color="textSecondary" paragraph>
                • Revisar avaliações pendentes
              </Typography>
              <Typography variant="body2" color="textSecondary" paragraph>
                • Acompanhar progresso das equipes
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default StatusAvaliacoes;

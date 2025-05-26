import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Alert,
  Button,
  Divider,
  Chip,
  LinearProgress,
  useTheme
} from '@mui/material';
import {
  Timeline,
  Assessment,
  TrendingUp,
  Assignment
} from '@mui/icons-material';
import AvaliacaoCard from './components/AvaliacaoCard';
import InsightsSection from './components/InsightsSection';
import ProgressChart from './components/ProgressChart';
import { performanceService } from '../../services/performanceService';

const AvaliacoesProgresso = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState({
    avaliacaoAtual: null,
    avaliacoesAnteriores: [],
    progressoGeral: 0,
    insights: []
  });
  const theme = useTheme();

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        // Em produção, chamar API real
        const mockData = {
          avaliacaoAtual: {
            id: 1,
            ciclo: '2025.1',
            status: 'pendente',
            prazo: '2025-06-30',
            progressoPreenchimento: 30
          },
          avaliacoesAnteriores: [
            {
              id: 2,
              ciclo: '2024.2',
              status: 'concluida',
              notaFinal: 4.5,
              data: '2024-12-15'
            }
          ],
          progressoGeral: 85,
          insights: [
            {
              tipo: 'destaque',
              mensagem: 'Melhoria consistente em Trabalho em Equipe nas últimas 3 avaliações'
            },
            {
              tipo: 'oportunidade',
              mensagem: 'Foco em Proatividade pode ajudar na próxima avaliação'
            }
          ]
        };
        
        setData(mockData);
      } catch (err) {
        setError('Erro ao carregar dados. Tente novamente mais tarde.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="400px">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom fontWeight="bold">
        Avaliações e Progresso
      </Typography>

      {/* Avaliação Atual */}
      {data.avaliacaoAtual && (
        <Card sx={{ mb: 4, borderTop: `4px solid ${theme.palette.primary.main}` }}>
          <CardContent>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
              <Typography variant="h6">
                Avaliação Atual - Ciclo {data.avaliacaoAtual.ciclo}
              </Typography>
              <Chip 
                label={data.avaliacaoAtual.status === 'pendente' ? 'Pendente' : 'Em Andamento'}
                color={data.avaliacaoAtual.status === 'pendente' ? 'warning' : 'info'}
              />
            </Box>
            
            <Grid container spacing={3}>
              <Grid item xs={12} md={8}>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Progresso do Preenchimento
                  </Typography>
                  <LinearProgress 
                    variant="determinate" 
                    value={data.avaliacaoAtual.progressoPreenchimento} 
                    sx={{ height: 8, borderRadius: 4 }}
                  />
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    {data.avaliacaoAtual.progressoPreenchimento}% concluído
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={4} sx={{ display: 'flex', alignItems: 'center' }}>
                <Button 
                  variant="contained" 
                  fullWidth
                  onClick={() => {}} // Implementar navegação para o formulário
                >
                  Continuar Avaliação
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      )}

      <Grid container spacing={4}>
        {/* Gráficos de Progresso */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Evolução do Desempenho
              </Typography>
              <ProgressChart />
            </CardContent>
          </Card>
        </Grid>

        {/* Insights */}
        <Grid item xs={12} md={4}>
          <InsightsSection insights={data.insights} />
        </Grid>
      </Grid>

      {/* Avaliações Anteriores */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" gutterBottom>
          Histórico de Avaliações
        </Typography>
        <Grid container spacing={3}>
          {data.avaliacoesAnteriores.map((avaliacao) => (
            <Grid item xs={12} md={6} key={avaliacao.id}>
              <AvaliacaoCard avaliacao={avaliacao} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default AvaliacoesProgresso;

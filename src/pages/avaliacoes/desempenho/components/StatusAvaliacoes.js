import React from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  LinearProgress,
  Chip
} from '@mui/material';

const StatusAvaliacoes = () => {
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
                  value={65} 
                  sx={{ flex: 1, mr: 2 }} 
                />
                <Typography variant="body2" color="textSecondary">
                  65%
                </Typography>
              </Box>
              <Grid container spacing={2}>
                <Grid item>
                  <Chip label="30 Pendentes" color="warning" />
                </Grid>
                <Grid item>
                  <Chip label="50 Concluídas" color="success" />
                </Grid>
                <Grid item>
                  <Chip label="10 Em Andamento" color="info" />
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
              <Typography variant="body2" color="textSecondary" paragraph>
                • Turno A apresenta maior índice de conclusão (85%)
              </Typography>
              <Typography variant="body2" color="textSecondary" paragraph>
                • 15 avaliações pendentes vencem esta semana
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Mais cards com estatísticas e informações */}
      </Grid>
    </Box>
  );
};

export default StatusAvaliacoes;

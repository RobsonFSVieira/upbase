import React, { useState, useEffect } from 'react';
import { 
  Card, 
  CardHeader, 
  CardContent, 
  Typography, 
  Grid, 
  Chip,
  Box,
  CircularProgress
} from '@mui/material';
import { useParams } from 'react-router-dom';
import { performanceService } from '../../services/performanceService';

const PerformanceDetail = () => {
  const [evaluation, setEvaluation] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const loadEvaluation = async () => {
      try {
        setLoading(true);
        const data = await performanceService.getById(id);
        setEvaluation(data);
      } catch (error) {
        console.error('Erro ao carregar avaliação:', error);
      } finally {
        setLoading(false);
      }
    };

    loadEvaluation();
  }, [id]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" p={3}>
        <CircularProgress />
      </Box>
    );
  }

  if (!evaluation) {
    return (
      <Typography color="error">
        Avaliação não encontrada
      </Typography>
    );
  }

  return (
    <Card>
      <CardHeader
        title={evaluation.employeeName}
        action={
          <Chip 
            color={evaluation.rating >= 4 ? "success" : "warning"}
            label={`${evaluation.rating}/5`}
          />
        }
      />
      <CardContent>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6">Departamento</Typography>
            <Typography paragraph>{evaluation.department}</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h6">Período</Typography>
            <Typography paragraph>{evaluation.period}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">Metas Atingidas</Typography>
            <Typography paragraph>{evaluation.goals}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">Competências</Typography>
            <Typography paragraph>{evaluation.skills}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">Comentários</Typography>
            <Typography paragraph>{evaluation.comments}</Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default PerformanceDetail;

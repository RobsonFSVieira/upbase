import React, { useState, useEffect } from 'react';
import { 
  Card, 
  CardHeader, 
  CardContent, 
  Typography, 
  Grid, 
  Chip,
  Box,
  CircularProgress,
  Button,
  Divider,
  IconButton
} from '@mui/material';
import { 
  Edit as EditIcon, 
  Delete as DeleteIcon,
  ArrowBack as ArrowBackIcon
} from '@mui/icons-material';
import { useParams, useNavigate } from 'react-router-dom';
import { performanceService } from '../../services/performanceService';
import DeleteConfirmDialog from '../common/DeleteConfirmDialog';

const PerformanceDetail = () => {
  const [evaluation, setEvaluation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteInProgress, setDeleteInProgress] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

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

    if (id) {
      loadEvaluation();
    }
  }, [id]);

  const handleEdit = () => {
    navigate(`/performance/edit/${id}`);
  };

  const handleDelete = async () => {
    try {
      setDeleteInProgress(true);
      await performanceService.delete(id);
      navigate('/avaliacoes/desempenho', { replace: true });
    } catch (error) {
      console.error('Erro ao excluir avaliação:', error);
      setDeleteInProgress(false);
    }
  };

  const handleBack = () => {
    navigate('/avaliacoes/desempenho');
  };

  const getRatingColor = (rating) => {
    const numRating = parseInt(rating);
    if (numRating >= 4) return "success";
    if (numRating >= 3) return "info";
    if (numRating >= 2) return "warning";
    return "error";
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="400px">
        <CircularProgress />
      </Box>
    );
  }

  if (!evaluation) {
    return (
      <Card>
        <CardContent>
          <Typography color="error">
            Avaliação não encontrada ou foi removida.
          </Typography>
          <Button 
            startIcon={<ArrowBackIcon />}
            onClick={handleBack}
            sx={{ mt: 2 }}
          >
            Voltar para a lista
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Button 
          startIcon={<ArrowBackIcon />}
          onClick={handleBack}
        >
          Voltar para a lista
        </Button>
        <Box>
          <IconButton 
            color="primary" 
            onClick={handleEdit}
            title="Editar"
          >
            <EditIcon />
          </IconButton>
          <IconButton 
            color="error" 
            onClick={() => setDeleteDialogOpen(true)}
            title="Excluir"
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      </Box>

      <Card>
        <CardHeader
          title={
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <Typography variant="h5">{evaluation.employeeName}</Typography>
              <Chip 
                color={getRatingColor(evaluation.rating)}
                label={`${evaluation.rating}/5`}
                size="medium"
              />
            </Box>
          }
          subheader={`${evaluation.department} | ${evaluation.period}`}
        />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>Metas Atingidas</Typography>
              <Typography paragraph>{evaluation.goals}</Typography>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>Avaliação de Competências</Typography>
              <Typography paragraph>{evaluation.skills}</Typography>
            </Grid>
            
            {evaluation.comments && (
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>Comentários Adicionais</Typography>
                <Typography paragraph>{evaluation.comments}</Typography>
              </Grid>
            )}
          </Grid>
        </CardContent>
      </Card>

      <DeleteConfirmDialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={handleDelete}
        title="Excluir Avaliação"
        message="Tem certeza que deseja excluir esta avaliação de desempenho? Esta ação não pode ser desfeita."
        loading={deleteInProgress}
      />
    </>
  );
};

export default PerformanceDetail;

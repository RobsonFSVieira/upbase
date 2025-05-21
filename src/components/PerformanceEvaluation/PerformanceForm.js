import React, { useState, useEffect } from 'react';
import { 
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  IconButton,
  CircularProgress,
  Box
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { useParams, useNavigate } from 'react-router-dom';
import { performanceService } from '../../services/performanceService';

const PerformanceForm = ({ onClose, onSave, isDialog = false }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [evaluation, setEvaluation] = useState({
    employeeName: '',
    department: '',
    period: '',
    goals: '',
    skills: '',
    rating: '',
    comments: ''
  });

  // Carregar dados para edição se houver ID
  useEffect(() => {
    if (id) {
      const loadEvaluation = async () => {
        setLoading(true);
        try {
          const data = await performanceService.getById(id);
          if (data) {
            setEvaluation(data);
          } else {
            console.error('Avaliação não encontrada');
            // Redirecionar para lista se for uma página
            if (!isDialog) navigate('/avaliacoes/desempenho');
          }
        } catch (err) {
          console.error('Erro ao carregar avaliação:', err);
        } finally {
          setLoading(false);
        }
      };
      loadEvaluation();
    }
  }, [id, navigate, isDialog]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEvaluation(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (id) {
        await performanceService.update(id, evaluation);
      } else {
        await performanceService.create(evaluation);
      }
      
      if (onSave) {
        onSave();
      } else if (!isDialog) {
        navigate('/avaliacoes/desempenho');
      }
    } catch (err) {
      console.error('Erro ao salvar avaliação:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    if (onClose) {
      onClose();
    } else if (!isDialog) {
      navigate('/avaliacoes/desempenho');
    }
  };

  const formContent = (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            required
            name="employeeName"
            label="Nome do Funcionário"
            value={evaluation.employeeName}
            onChange={handleChange}
            disabled={loading}
          />
        </Grid>
        
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            required
            name="department"
            label="Departamento"
            value={evaluation.department}
            onChange={handleChange}
            disabled={loading}
          />
        </Grid>
        
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            required
            name="period"
            label="Período de Avaliação"
            value={evaluation.period}
            onChange={handleChange}
            disabled={loading}
            placeholder="Ex: 2023 Q1"
          />
        </Grid>
        
        <Grid item xs={12}>
          <TextField
            fullWidth
            required
            multiline
            rows={3}
            name="goals"
            label="Metas Atingidas"
            value={evaluation.goals}
            onChange={handleChange}
            disabled={loading}
          />
        </Grid>
        
        <Grid item xs={12}>
          <TextField
            fullWidth
            required
            multiline
            rows={3}
            name="skills"
            label="Avaliação de Competências"
            value={evaluation.skills}
            onChange={handleChange}
            disabled={loading}
          />
        </Grid>
        
        <Grid item xs={12}>
          <FormControl fullWidth required>
            <InputLabel>Classificação Geral</InputLabel>
            <Select
              name="rating"
              value={evaluation.rating}
              onChange={handleChange}
              disabled={loading}
              label="Classificação Geral"
            >
              <MenuItem value="5">Excelente</MenuItem>
              <MenuItem value="4">Muito Bom</MenuItem>
              <MenuItem value="3">Bom</MenuItem>
              <MenuItem value="2">Regular</MenuItem>
              <MenuItem value="1">Precisa Melhorar</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        
        <Grid item xs={12}>
          <TextField
            fullWidth
            multiline
            rows={3}
            name="comments"
            label="Comentários Adicionais"
            value={evaluation.comments}
            onChange={handleChange}
            disabled={loading}
          />
        </Grid>
      </Grid>

      {!isDialog && (
        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            type="button"
            onClick={handleCancel}
            disabled={loading}
            sx={{ mr: 1 }}
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Salvar'}
          </Button>
        </Box>
      )}
    </form>
  );

  // Renderizar como página ou como diálogo
  if (isDialog) {
    return (
      <>
        <DialogTitle>
          {id ? 'Editar Avaliação' : 'Nova Avaliação'}
          <IconButton
            aria-label="close"
            onClick={handleCancel}
            sx={{ position: 'absolute', right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          {formContent}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} disabled={loading}>
            Cancelar
          </Button>
          <Button 
            onClick={handleSubmit}
            variant="contained" 
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Salvar'}
          </Button>
        </DialogActions>
      </>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        {id ? 'Editar Avaliação de Desempenho' : 'Nova Avaliação de Desempenho'}
      </Typography>
      {loading && !evaluation.id ? (
        <Box display="flex" justifyContent="center" my={4}>
          <CircularProgress />
        </Box>
      ) : (
        formContent
      )}
    </Box>
  );
};

export default PerformanceForm;

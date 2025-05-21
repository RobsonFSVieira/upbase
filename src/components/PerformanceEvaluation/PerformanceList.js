import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  Button,
  Box,
  Typography,
  Alert,
  Chip,
  Stack,
  IconButton
} from '@mui/material';
import {
  Edit as EditIcon,
  DeleteOutline as DeleteIcon,
  GetApp as DownloadIcon
} from '@mui/icons-material';
import { performanceService } from '../../services/performanceService';
import PerformanceFilters from './PerformanceFilters';
import DeleteConfirmDialog from '../common/DeleteConfirmDialog';
import { exportService } from '../../services/exportService';

const PerformanceList = ({ onError, onLoadingChange }) => {
  const [evaluations, setEvaluations] = useState([]);
  const [filteredEvaluations, setFilteredEvaluations] = useState([]);
  const [loadError, setLoadError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState({
    employeeName: '',
    department: '',
    period: '',
    rating: ''
  });
  const [filtersExpanded, setFiltersExpanded] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteInProgress, setDeleteInProgress] = useState(false);
  const [evaluationToDelete, setEvaluationToDelete] = useState(null);

  // Carregar dados
  useEffect(() => {
    const loadEvaluations = async () => {
      try {
        setIsLoading(true);
        if (onLoadingChange) onLoadingChange(true);
        const data = await performanceService.getAll();
        setEvaluations(data || []);
        setFilteredEvaluations(data || []);
      } catch (err) {
        console.error('Erro ao carregar avaliações:', err);
        setLoadError(err.message || 'Erro ao carregar dados');
        if (onError) onError(err);
      } finally {
        setIsLoading(false);
        if (onLoadingChange) onLoadingChange(false);
      }
    };
    
    loadEvaluations();
  }, [onError, onLoadingChange]);

  // Aplicar filtros quando os filtros ou dados mudarem
  useEffect(() => {
    let filtered = [...evaluations];
    
    if (filters.employeeName) {
      filtered = filtered.filter(item => 
        item.employeeName.toLowerCase().includes(filters.employeeName.toLowerCase())
      );
    }
    
    if (filters.department) {
      filtered = filtered.filter(item => 
        item.department.toLowerCase().includes(filters.department.toLowerCase())
      );
    }
    
    if (filters.period) {
      filtered = filtered.filter(item => 
        item.period.toLowerCase().includes(filters.period.toLowerCase())
      );
    }
    
    if (filters.rating) {
      filtered = filtered.filter(item => item.rating === filters.rating);
    }
    
    setFilteredEvaluations(filtered);
  }, [filters, evaluations]);

  // Manipuladores de eventos
  const toggleFiltersExpanded = () => {
    setFiltersExpanded(prev => !prev);
  };

  const handleExportExcel = () => {
    exportService.toExcel(
      filteredEvaluations,
      'avaliacoes_desempenho'
    );
  };

  const handleExportPDF = () => {
    exportService.toPDF(
      filteredEvaluations,
      'avaliacoes_desempenho'
    );
  };

  const handleDeleteClick = (evaluation) => {
    setEvaluationToDelete(evaluation);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!evaluationToDelete) return;
    
    setDeleteInProgress(true);
    try {
      await performanceService.delete(evaluationToDelete.id);
      
      // Atualizar a lista local
      const updatedEvaluations = evaluations.filter(
        item => item.id !== evaluationToDelete.id
      );
      setEvaluations(updatedEvaluations);
      
      // Fechar o diálogo
      setDeleteDialogOpen(false);
      setEvaluationToDelete(null);
    } catch (error) {
      console.error('Erro ao excluir avaliação:', error);
    } finally {
      setDeleteInProgress(false);
    }
  };

  // Renderização condicional para erros e carregamento
  if (loadError) {
    return (
      <Alert severity="error">
        Erro ao carregar avaliações: {loadError}
      </Alert>
    );
  }

  if (isLoading) {
    return null; // Componente pai já mostra o indicador de carregamento
  }

  // Função para renderizar o chip de classificação com cores
  const renderRatingChip = (rating) => {
    const numRating = parseInt(rating);
    let color = 'default';
    let label = rating;
    
    if (numRating === 5) {
      color = 'success';
      label = 'Excelente';
    } else if (numRating === 4) {
      color = 'info';
      label = 'Muito Bom';
    } else if (numRating === 3) {
      color = 'primary';
      label = 'Bom';
    } else if (numRating === 2) {
      color = 'warning';
      label = 'Regular';
    } else if (numRating === 1) {
      color = 'error';
      label = 'Precisa Melhorar';
    }
    
    return <Chip label={label} color={color} size="small" />;
  };

  return (
    <Box>
      {/* Componente de Filtros */}
      <PerformanceFilters
        filters={filters}
        setFilters={setFilters}
        expanded={filtersExpanded}
        toggleExpanded={toggleFiltersExpanded}
      />

      {/* Barra de ações */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6">
          {filteredEvaluations.length} Avaliações 
          {filters.employeeName || filters.department || filters.period || filters.rating ? ' (Filtradas)' : ''}
        </Typography>
        
        <Stack direction="row" spacing={1}>
          <Button
            variant="outlined"
            startIcon={<DownloadIcon />}
            onClick={handleExportExcel}
            disabled={filteredEvaluations.length === 0}
            size="small"
          >
            Excel
          </Button>
          <Button
            variant="outlined"
            startIcon={<DownloadIcon />}
            onClick={handleExportPDF}
            disabled={filteredEvaluations.length === 0}
            size="small"
          >
            PDF
          </Button>
        </Stack>
      </Box>

      {/* Lista de Avaliações */}
      {filteredEvaluations.length === 0 ? (
        <Alert severity="info">
          Nenhuma avaliação encontrada. Clique em "Nova Avaliação" para adicionar.
        </Alert>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Funcionário</TableCell>
                <TableCell>Departamento</TableCell>
                <TableCell>Período</TableCell>
                <TableCell>Classificação</TableCell>
                <TableCell align="center">Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredEvaluations.map((evaluation) => (
                <TableRow key={evaluation.id}>
                  <TableCell>{evaluation.employeeName}</TableCell>
                  <TableCell>{evaluation.department}</TableCell>
                  <TableCell>{evaluation.period}</TableCell>
                  <TableCell>{renderRatingChip(evaluation.rating)}</TableCell>
                  <TableCell align="center">
                    <Stack direction="row" spacing={1} justifyContent="center">
                      <IconButton 
                        size="small" 
                        component={Link} 
                        to={`/performance/${evaluation.id}`}
                        title="Ver Detalhes"
                        color="info"
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                      <IconButton 
                        size="small" 
                        color="error"
                        onClick={() => handleDeleteClick(evaluation)}
                        title="Excluir"
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Diálogo de confirmação de exclusão */}
      <DeleteConfirmDialog 
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={handleDeleteConfirm}
        title="Excluir Avaliação"
        message={`Tem certeza que deseja excluir a avaliação de ${evaluationToDelete?.employeeName || ''}? Esta ação não pode ser desfeita.`}
        loading={deleteInProgress}
      />
    </Box>
  );
};

export default PerformanceList;

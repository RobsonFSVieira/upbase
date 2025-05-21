import React, { useState, useEffect, useCallback } from 'react';
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
  Alert,
  Stack
} from '@mui/material';
import { performanceService } from '../../services/performanceService';

const PerformanceList = ({ onError, onLoadingChange }) => {
  const [evaluations, setEvaluations] = useState([]);
  const [filteredEvaluations, setFilteredEvaluations] = useState([]);

  const loadEvaluations = useCallback(async () => {
    try {
      if (onLoadingChange) onLoadingChange(true);
      console.log('Carregando avaliações...');
      const response = await performanceService.getAll();
      console.log('Avaliações carregadas:', response);
      
      setEvaluations(response || []);
      setFilteredEvaluations(response || []);
    } catch (error) {
      console.error('Erro ao carregar avaliações:', error);
      if (onError) onError(error);
      setEvaluations([]);
      setFilteredEvaluations([]);
    } finally {
      if (onLoadingChange) onLoadingChange(false);
    }
  }, [onLoadingChange, onError]);

  useEffect(() => {
    loadEvaluations();
  }, [loadEvaluations]);

  if (!filteredEvaluations || filteredEvaluations.length === 0) {
    return (
      <Alert severity="info">
        Nenhuma avaliação encontrada. Clique em "Nova Avaliação" para adicionar.
      </Alert>
    );
  }

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" mb={2}>
        <Box></Box>
        <Stack direction="row" spacing={1}>
          <Button 
            variant="contained" 
            color="success" 
            size="small"
          >
            Exportar Excel
          </Button>
          <Button 
            variant="contained" 
            color="error" 
            size="small"
          >
            Exportar PDF
          </Button>
        </Stack>
      </Stack>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Funcionário</TableCell>
              <TableCell>Departamento</TableCell>
              <TableCell>Período</TableCell>
              <TableCell>Classificação</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredEvaluations.map((evaluation) => (
              <TableRow key={evaluation.id}>
                <TableCell>{evaluation.employeeName}</TableCell>
                <TableCell>{evaluation.department}</TableCell>
                <TableCell>{evaluation.period}</TableCell>
                <TableCell>{evaluation.rating}</TableCell>
                <TableCell>
                  <Button 
                    variant="contained" 
                    size="small" 
                    component={Link} 
                    to={`/performance/${evaluation.id}`}
                  >
                    Ver Detalhes
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default PerformanceList;

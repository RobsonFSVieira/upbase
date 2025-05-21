import React, { useState, useEffect, useRef } from 'react';
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
  Alert
} from '@mui/material';
import { performanceService } from '../../services/performanceService';

const PerformanceList = ({ onError, onLoadingChange }) => {
  const [evaluations, setEvaluations] = useState([]);
  const isFirstRender = useRef(true);

  // Use useRef para evitar o looping infinito
  useEffect(() => {
    const loadEvaluations = async () => {
      // Evitar múltiplos carregamentos no mesmo render
      if (isFirstRender.current) {
        isFirstRender.current = false;
        
        try {
          if (onLoadingChange) onLoadingChange(true);
          console.log('Carregando avaliações...');
          
          const data = await performanceService.getAll();
          console.log('Avaliações carregadas:', data);
          
          setEvaluations(data || []);
        } catch (error) {
          console.error('Erro ao carregar avaliações:', error);
          if (onError) onError(error);
        } finally {
          if (onLoadingChange) onLoadingChange(false);
        }
      }
    };

    loadEvaluations();
    // Remova as dependências para evitar loop
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!evaluations || evaluations.length === 0) {
    return (
      <Alert severity="info">
        Nenhuma avaliação encontrada. Clique em "Nova Avaliação" para adicionar.
      </Alert>
    );
  }

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Lista de Avaliações de Desempenho
      </Typography>

      <TableContainer component={Paper} sx={{ mt: 2 }}>
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
            {evaluations.map((evaluation) => (
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

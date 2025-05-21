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
  Alert
} from '@mui/material';
import { performanceService } from '../../services/performanceService';

// Memoize o componente para evitar re-renders desnecessários
const PerformanceList = React.memo(({ onError, onLoadingChange }) => {
  const [evaluations, setEvaluations] = useState([]);

  // Load only once at mount
  useEffect(() => {
    let isMounted = true;

    const loadEvaluations = async () => {
      try {
        if (onLoadingChange) onLoadingChange(true);
        
        // Simular um timeout mínimo para evitar flickering da UI
        const [data] = await Promise.all([
          performanceService.getAll(),
          new Promise(resolve => setTimeout(resolve, 300))
        ]);
        
        // Verificar se componente ainda está montado
        if (isMounted) {
          setEvaluations(data || []);
          if (onLoadingChange) onLoadingChange(false);
        }
      } catch (error) {
        console.error('Erro ao carregar avaliações:', error);
        if (isMounted) {
          if (onError) onError(error);
          if (onLoadingChange) onLoadingChange(false);
        }
      }
    };

    loadEvaluations();

    // Cleanup function
    return () => {
      isMounted = false;
    };
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
});

export default PerformanceList;

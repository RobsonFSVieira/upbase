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

const PerformanceList = ({ onError, onLoadingChange }) => {
  const [evaluations, setEvaluations] = useState([]);
  // Adicionando um estado de erro local para manuseio correto
  const [loadError, setLoadError] = useState(null);
  // Adicionando um estado de loading local para manuseio correto
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        if (onLoadingChange) onLoadingChange(true);
        const data = await performanceService.getAll();
        setEvaluations(data);
      } catch (err) {
        console.error('Erro ao carregar avaliações:', err);
        setLoadError(err.message || 'Erro ao carregar dados');
        if (onError) onError(err);
      } finally {
        setIsLoading(false);
        if (onLoadingChange) onLoadingChange(false);
      }
    }
    
    fetchData();
  }, [onError, onLoadingChange]);

  // Mostrar mensagem de erro se houver algum problema
  if (loadError) {
    return (
      <Alert severity="error">
        Erro ao carregar avaliações: {loadError}
      </Alert>
    );
  }

  // Verifica se o carregamento está em andamento
  if (isLoading) {
    return null; // A página principal já mostra o loading
  }

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

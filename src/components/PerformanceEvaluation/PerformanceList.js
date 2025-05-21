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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const loadEvaluations = async () => {
      try {
        // Garantir que notificamos o componente pai sobre o estado de loading
        if (onLoadingChange) onLoadingChange(true);
        setLoading(true);
        
        // Lidar com possíveis erros
        const data = await performanceService.getAll();
        
        // Verificar se o componente ainda está montado
        if (isMounted) {
          console.log('Dados carregados com sucesso:', data);
          setEvaluations(Array.isArray(data) ? data : []);
          setError(null);
        }
      } catch (error) {
        console.error('Erro ao carregar avaliações:', error);
        if (isMounted) {
          setError(error.message || 'Erro ao carregar avaliações');
          if (onError) onError(error);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
          if (onLoadingChange) onLoadingChange(false);
        }
      }
    };

    loadEvaluations();

    return () => {
      isMounted = false;
    };
  }, [onError, onLoadingChange]);

  // Mostrar mensagem de erro em caso de falha
  if (error) {
    return (
      <Alert severity="error">
        {error}
        <Button 
          onClick={() => window.location.reload()} 
          sx={{ ml: 2 }}
          variant="outlined"
          size="small"
        >
          Tentar novamente
        </Button>
      </Alert>
    );
  }

  // Mostrar mensagem se não houver avaliações
  if (!loading && (!evaluations || evaluations.length === 0)) {
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

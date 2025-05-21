import React, { useState, useCallback } from 'react';
import { Box, Typography, Card, Alert, CircularProgress, Button } from '@mui/material';
import PerformanceList from '../../../components/PerformanceEvaluation/PerformanceList';

const AvaliacoesDesempenho = () => {
  console.log('Renderizando AvaliacoesDesempenho');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const handleError = useCallback((error) => {
    console.error('Erro na avaliação de desempenho:', error);
    setError('Ocorreu um erro ao carregar os dados. Por favor, tente novamente.');
    setIsLoading(false);
  }, []);

  const handleLoadingChange = useCallback((loading) => {
    console.log('Loading state changed to:', loading);
    setIsLoading(loading);
  }, []);

  // Identificador único para o PerformanceList para evitar re-renderizações desnecessárias
  const performanceListKey = 'performance-list-component';

  return (
    <Box>
      {error && (
        <Alert severity="error" onClose={() => setError(null)}>
          {error}
        </Alert>
      )}
      
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography variant="h5" fontWeight="bold">
          Avaliações de Desempenho
        </Typography>
        <Button 
          variant="contained"
          color="primary"
          onClick={() => setDialogOpen(true)}
        >
          Nova Avaliação
        </Button>
      </Box>
      
      <Card>
        <Box p={3}>
          {isLoading ? (
            <Box display="flex" justifyContent="center" alignItems="center" p={3}>
              <CircularProgress />
              <Typography variant="body2" sx={{ ml: 2 }}>
                Carregando avaliações...
              </Typography>
            </Box>
          ) : (
            <PerformanceList 
              key={performanceListKey}
              onError={handleError} 
              onLoadingChange={handleLoadingChange}
            />
          )}
        </Box>
      </Card>
    </Box>
  );
};

export default AvaliacoesDesempenho;
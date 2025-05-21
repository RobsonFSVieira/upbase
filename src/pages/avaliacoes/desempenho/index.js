import React, { useState, useCallback, useEffect } from 'react';
import { Box, Typography, Card, Alert, CircularProgress, Button } from '@mui/material';
import PerformanceList from '../../../components/PerformanceEvaluation/PerformanceList';

const AvaliacoesDesempenho = () => {
  console.log('Rendering AvaliacoesDesempenho component');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Para garantir que o estado de loading seja atualizado independentemente
  useEffect(() => {
    // Definir um timeout para verificar se os dados não carregaram
    const timeout = setTimeout(() => {
      if (isLoading) {
        setIsLoading(false);
      }
    }, 5000); // Timeout de 5 segundos
    
    return () => clearTimeout(timeout);
  }, [isLoading]);

  const handleError = useCallback((error) => {
    console.error('Erro na avaliação de desempenho:', error);
    setError('Ocorreu um erro ao carregar os dados. Por favor, tente novamente.');
    setIsLoading(false);
  }, []);

  const handleLoadingChange = useCallback((loading) => {
    console.log('Loading state changed to:', loading);
    setIsLoading(loading);
  }, []);

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
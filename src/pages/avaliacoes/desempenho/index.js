import React, { useState, useCallback } from 'react';
import { Box, Typography, Card, Alert, CircularProgress, Button } from '@mui/material';
import PerformanceList from '../../../components/PerformanceEvaluation/PerformanceList';

// Use React.memo para evitar re-renderizações desnecessárias
const AvaliacoesDesempenho = React.memo(() => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Callbacks estáveis para evitar re-renderizações
  const handleError = useCallback((error) => {
    console.error('Erro na avaliação de desempenho:', error);
    setError('Ocorreu um erro ao carregar os dados. Por favor, tente novamente.');
    setIsLoading(false);
  }, []);

  const handleLoadingChange = useCallback((loading) => {
    setIsLoading(loading);
  }, []);

  // Use React.useMemo para componentes caros de renderizar
  const renderContent = React.useMemo(() => {
    if (isLoading) {
      return (
        <Box display="flex" justifyContent="center" alignItems="center" p={3}>
          <CircularProgress size={24} />
          <Typography variant="body2" sx={{ ml: 2 }}>
            Carregando avaliações...
          </Typography>
        </Box>
      );
    }
    
    return (
      <PerformanceList 
        onError={handleError} 
        onLoadingChange={handleLoadingChange}
      />
    );
  }, [isLoading, handleError, handleLoadingChange]);

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
          {renderContent}
        </Box>
      </Card>
    </Box>
  );
});

export default AvaliacoesDesempenho;
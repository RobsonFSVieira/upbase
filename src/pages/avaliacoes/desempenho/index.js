import React, { useState, useCallback } from 'react';
import { Box, Typography, Card, Alert, Spinner, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import PerformanceList from '../../../components/PerformanceEvaluation/PerformanceList';
import AvaliacaoPaginada from '../../../features/avaliacoes/components/AvaliacaoPaginada';

const AvaliacoesDesempenho = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const handleError = useCallback((error) => {
    console.error('Erro:', error);
    setError('Ocorreu um erro ao carregar os dados. Por favor, tente novamente.');
    setIsLoading(false);
  }, []);

  const handleLoadingChange = useCallback((loading) => {
    setIsLoading(loading);
  }, []);

  return (
    <Box>
      {error && (
        <Alert variant="danger" onClose={() => setError(null)} dismissible>
          {error}
        </Alert>
      )}
      
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography variant="h5" gutterBottom fontWeight="bold">
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
          <PerformanceList 
            onError={handleError} 
            onLoadingChange={handleLoadingChange}
            isLoading={isLoading}
          />
          {isLoading && (
            <div className="text-center position-absolute top-50 start-50 translate-middle">
              <Spinner animation="border" />
            </div>
          )}
        </Box>
      </Card>

      {dialogOpen && (
        <AvaliacaoPaginada
          onClose={() => setDialogOpen(false)}
          onComplete={() => {
            setDialogOpen(false);
            // Implementar lógica de conclusão
          }}
        />
      )}
    </Box>
  );
};

export default AvaliacoesDesempenho;
import React, { useState } from 'react';
import { Box, Typography, Card, Alert, CircularProgress, Button, Dialog } from '@mui/material';
import PerformanceList from '../../../components/PerformanceEvaluation/PerformanceList';
import PerformanceForm from '../../../components/PerformanceEvaluation/PerformanceForm';

const AvaliacoesDesempenho = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const handleError = (error) => {
    console.error('Erro na avaliação de desempenho:', error);
    setError('Ocorreu um erro ao carregar os dados. Por favor, tente novamente.');
  };

  const handleLoadingChange = (loading) => {
    setIsLoading(loading);
  };

  const handleSaveEvaluation = () => {
    setDialogOpen(false);
    // Aqui podemos adicionar feedback de sucesso e recarregar os dados
  };

  return (
    <Box>
      {error && (
        <Alert severity="error" onClose={() => setError(null)} sx={{ mb: 2 }}>
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
        <Box p={3} position="relative" minHeight="300px">
          {isLoading && (
            <Box 
              position="absolute"
              display="flex"
              justifyContent="center"
              alignItems="center"
              top={0}
              left={0}
              right={0}
              bottom={0}
              bgcolor="rgba(255,255,255,0.7)"
              zIndex={1}
            >
              <CircularProgress size={40} />
            </Box>
          )}
          <PerformanceList 
            onError={handleError} 
            onLoadingChange={handleLoadingChange}
          />
        </Box>
      </Card>

      <Dialog 
        open={dialogOpen} 
        onClose={() => setDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <PerformanceForm 
          onCancel={() => setDialogOpen(false)}
          onSave={handleSaveEvaluation}
        />
      </Dialog>
    </Box>
  );
};

export default AvaliacoesDesempenho;
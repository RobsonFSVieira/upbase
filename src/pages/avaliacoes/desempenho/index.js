import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  Alert,
  CircularProgress,
  Button,
  Dialog,
  Tabs,
  Tab,
  Divider
} from '@mui/material';
import PerformanceList from '../../../components/PerformanceEvaluation/PerformanceList';
import PerformanceForm from '../../../components/PerformanceEvaluation/PerformanceForm';
import FormTemplateManager from '../../../components/PerformanceEvaluation/FormTemplateManager';

const AvaliacoesDesempenho = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);
  const [activeTab, setActiveTab] = useState(0);

  // Simular perfil do usuário - em produção, viria do contexto de autenticação
  const userProfile = {
    id: "123",
    role: "lider" // 'lider' ou 'colaborador'
  };

  const handleError = (error) => {
    console.error('Erro na avaliação de desempenho:', error);
    setError('Ocorreu um erro ao carregar os dados. Por favor, tente novamente.');
  };

  const handleLoadingChange = (loading) => {
    setIsLoading(loading);
  };

  const handleFormSave = () => {
    setDialogOpen(false);
    setRefreshKey(prev => prev + 1);
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
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
      
      {/* Apenas líderes veem as abas de gestão */}
      {userProfile.role === 'lider' && (
        <Tabs 
          value={activeTab} 
          onChange={handleTabChange} 
          sx={{ mb: 3 }}
          variant="fullWidth"
        >
          <Tab label="Avaliações" />
          <Tab label="Modelos de Formulários" />
        </Tabs>
      )}
      
      {activeTab === 0 || userProfile.role !== 'lider' ? (
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
              key={refreshKey}
              onError={handleError} 
              onLoadingChange={handleLoadingChange}
            />
          </Box>
        </Card>
      ) : (
        <Card>
          <Box p={3}>
            <FormTemplateManager />
          </Box>
        </Card>
      )}

      <Dialog 
        open={dialogOpen} 
        onClose={() => setDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <PerformanceForm 
          onClose={() => setDialogOpen(false)}
          onSave={handleFormSave}
          isDialog={true}
        />
      </Dialog>
    </Box>
  );
};

export default AvaliacoesDesempenho;
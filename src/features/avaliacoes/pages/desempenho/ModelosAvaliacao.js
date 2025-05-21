import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Card, 
  Alert,
  Tabs,
  Tab,
  Divider
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import FormTemplateList from '../../components/FormTemplateList';

const ModelosAvaliacao = () => {
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('desempenho');

  const handleError = (message) => {
    setError(message);
  };

  const handleChangeTab = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <Box>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}
      
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5" fontWeight="bold">
          Modelos de Avaliação
        </Typography>
        <Button 
          variant="contained" 
          color="primary" 
          startIcon={<AddIcon />}
          component={Link}
          to="/avaliacoes/modelos/novo"
        >
          Novo Modelo
        </Button>
      </Box>
      
      <Card>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', px: 2 }}>
          <Tabs value={activeTab} onChange={handleChangeTab}>
            <Tab label="Avaliações de Desempenho" value="desempenho" />
            <Tab label="Avaliações de Experiência" value="experiencia" />
          </Tabs>
        </Box>
        
        <Divider />
        
        <Box p={3}>
          <FormTemplateList 
            type={activeTab}
            onError={handleError}
          />
        </Box>
      </Card>
    </Box>
  );
};

export default ModelosAvaliacao;

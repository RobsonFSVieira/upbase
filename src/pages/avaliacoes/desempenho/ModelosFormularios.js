import React from 'react';
import { Box, Typography, Card, CardContent, Button } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const ModelosFormularios = () => {
  const navigate = useNavigate();

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5">Modelos de Formulários</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => navigate('/avaliacoes/desempenho/criar-formulario')}
        >
          Criar Novo Formulário
        </Button>
      </Box>

      <Card>
        <CardContent>
          <Typography variant="body1" color="text.secondary">
            Clique no botão acima para criar um novo formulário no estilo Microsoft Forms.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ModelosFormularios;

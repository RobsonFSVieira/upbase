import React from 'react';
import { Card, CardContent, Typography, Box, Chip, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Assessment } from '@mui/icons-material';

const AvaliacoesPendentesCard = () => {
  const navigate = useNavigate();

  return (
    <Card>
      <CardContent>
        <Box display="flex" alignItems="center" gap={1} mb={2}>
          <Assessment color="primary" />
          <Typography variant="h6">Avaliações Pendentes</Typography>
        </Box>

        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h4" color="primary">5</Typography>
          <Chip label="3 Urgentes" color="error" size="small" />
        </Box>

        <Box>
          <Button 
            variant="contained" 
            fullWidth
            onClick={() => navigate('/avaliacoes/desempenho')}
          >
            Ver Avaliações
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default AvaliacoesPendentesCard;

import React, { useState } from 'react';
import { Typography, Box, Button, Stack, Card } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';

export default function AvaliacoesExperiencia() {
  const [, setDialogOpen] = useState(false); // Remover dialogOpen da desestruturação

  return (
    <Stack spacing={3}>
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
      }}>
        <Typography variant="h5" fontWeight="bold">
          Avaliação de Experiência
        </Typography>
        <Button 
          variant="contained" 
          startIcon={<AddIcon />}
          onClick={() => setDialogOpen(true)}
        >
          Nova Avaliação
        </Button>
      </Box>

      <Card>
        <Typography p={3}>Lista de Avaliações de Experiência em desenvolvimento</Typography>
      </Card>
    </Stack>
  );
}

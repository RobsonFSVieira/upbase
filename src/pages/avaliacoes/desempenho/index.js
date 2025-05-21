import React, { useState } from 'react';
import { Typography, Box, Button, Stack, Card } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import ListaAvaliacoesDesempenho from './components/ListaAvaliacoesDesempenho';

export default function AvaliacoesDesempenho() {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <Stack spacing={3}>
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
      }}>
        <Typography variant="h5" fontWeight="bold">
          Avaliação de Desempenho
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
        <ListaAvaliacoesDesempenho />
      </Card>
    </Stack>
  );
}
import React from 'react';
import { 
  Typography, 
  Paper, 
  Box, 
  Button,
  Stack
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import ListaAvaliacoes from './ListaAvaliacoes';

function Avaliacoes() {
  return (
    <Stack spacing={3}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h5">
          Avaliações
        </Typography>
        <Button 
          variant="contained" 
          startIcon={<AddIcon />}
          onClick={() => console.log('Nova avaliação')}
        >
          Nova Avaliação
        </Button>
      </Box>

      <Paper sx={{ p: 2 }}>
        <ListaAvaliacoes />
      </Paper>
    </Stack>
  );
}

export default Avaliacoes;
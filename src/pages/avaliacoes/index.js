import React, { useState } from 'react';
import { 
  Typography, 
  Paper, 
  Box, 
  Button,
  Stack,
  TextField,
  InputAdornment
} from '@mui/material';
import { Add as AddIcon, Search as SearchIcon } from '@mui/icons-material';
import ListaAvaliacoes from './ListaAvaliacoes';
import NovaAvaliacao from './NovaAvaliacao';

function Avaliacoes() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <Stack spacing={3}>
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 2
      }}>
        <Typography variant="h5">Avaliações</Typography>
        <Button 
          variant="contained" 
          startIcon={<AddIcon />}
          onClick={() => setDialogOpen(true)}
        >
          Nova Avaliação
        </Button>
      </Box>

      <TextField
        placeholder="Pesquisar avaliações..."
        variant="outlined"
        size="small"
        fullWidth
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />

      <Paper sx={{ p: 2 }}>
        <ListaAvaliacoes searchTerm={searchTerm} />
      </Paper>

      <NovaAvaliacao 
        open={dialogOpen} 
        onClose={() => setDialogOpen(false)} 
      />
    </Stack>
  );
}

export default Avaliacoes;
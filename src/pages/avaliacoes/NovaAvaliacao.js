import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
  Stack
} from '@mui/material';
import { TIPOS_AVALIACAO } from '../../utils/constants';

function NovaAvaliacao({ open, onClose }) {
  const handleSubmit = (event) => {
    event.preventDefault();
    // TODO: Implementar criação via Supabase
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Nova Avaliação</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Stack spacing={2}>
            <TextField
              label="Colaborador"
              required
              fullWidth
            />
            <TextField
              select
              label="Tipo de Avaliação"
              required
              fullWidth
            >
              {Object.entries(TIPOS_AVALIACAO).map(([key, value]) => (
                <MenuItem key={key} value={key}>
                  {value}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              type="date"
              label="Data"
              required
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancelar</Button>
          <Button type="submit" variant="contained">
            Criar
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default NovaAvaliacao;
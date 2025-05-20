import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
  Stack,
  FormControl,
  InputLabel,
  Select,
  IconButton,
  Typography,
  Box,
  Divider
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { TIPOS_AVALIACAO, STATUS_AVALIACAO } from '../../utils/constants';

function NovaAvaliacao({ open, onClose, avaliacao = null, onSubmit }) {
  const [formData, setFormData] = useState({
    colaborador: avaliacao?.colaborador || '',
    tipo: avaliacao?.tipo || '',
    data: avaliacao?.data || '',
    status: avaliacao?.status || 'Pendente',
    observacoes: avaliacao?.observacoes || '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit?.(formData);
    onClose();
  };

  const isEdit = !!avaliacao;

  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      maxWidth="sm" 
      fullWidth
      PaperProps={{
        sx: { borderRadius: 2 }
      }}
    >
      <DialogTitle sx={{ 
        display: 'flex', 
        justifyContent: 'space-between',
        alignItems: 'center',
        pb: 1
      }}>
        <Typography variant="h6">
          {isEdit ? 'Editar Avaliação' : 'Nova Avaliação'}
        </Typography>
        <IconButton edge="end" color="inherit" onClick={onClose} aria-label="close">
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <Divider />
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Stack spacing={3} sx={{ mt: 1 }}>
            <TextField
              label="Nome do Colaborador"
              name="colaborador"
              value={formData.colaborador}
              onChange={handleChange}
              required
              fullWidth
            />
            
            <FormControl fullWidth required>
              <InputLabel id="tipo-label">Tipo de Avaliação</InputLabel>
              <Select
                labelId="tipo-label"
                name="tipo"
                value={formData.tipo}
                onChange={handleChange}
                label="Tipo de Avaliação"
              >
                {Object.entries(TIPOS_AVALIACAO).map(([key, value]) => (
                  <MenuItem key={key} value={value}>
                    {value}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            
            <TextField
              type="date"
              label="Data da Avaliação"
              name="data"
              value={formData.data}
              onChange={handleChange}
              required
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
            
            {isEdit && (
              <FormControl fullWidth>
                <InputLabel id="status-label">Status</InputLabel>
                <Select
                  labelId="status-label"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  label="Status"
                >
                  {Object.entries(STATUS_AVALIACAO).map(([key, value]) => (
                    <MenuItem key={key} value={value}>
                      {value}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
            
            <TextField
              label="Observações"
              name="observacoes"
              value={formData.observacoes}
              onChange={handleChange}
              fullWidth
              multiline
              rows={4}
            />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3, pt: 1 }}>
          <Button 
            onClick={onClose} 
            variant="outlined"
            sx={{ borderRadius: 1 }}
          >
            Cancelar
          </Button>
          <Button 
            type="submit" 
            variant="contained"
            sx={{ borderRadius: 1 }}
          >
            {isEdit ? 'Atualizar' : 'Criar'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default NovaAvaliacao;
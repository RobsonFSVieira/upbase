import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { TIPOS_AVALIACAO_DESEMPENHO, STATUS_AVALIACAO } from '../../../../utils/constants';

function NovaAvaliacaoDesempenho({ open, onClose, avaliacao = null, onSubmit }) {
  // ...código existente adaptado para desempenho
  // Alterar TIPOS_AVALIACAO para TIPOS_AVALIACAO_DESEMPENHO

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        Nova Avaliação de Desempenho
        <CloseIcon onClick={onClose} style={{ cursor: 'pointer', position: 'absolute', right: 16, top: 16 }} />
      </DialogTitle>
      <DialogContent>
        {/* Conteúdo do formulário será implementado posteriormente */}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button variant="contained" onClick={onClose}>
          Salvar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default NovaAvaliacaoDesempenho;
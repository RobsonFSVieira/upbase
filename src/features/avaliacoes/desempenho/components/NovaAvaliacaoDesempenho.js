import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  // ...imports existentes
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { AVALIACAO } from '../../../../../utils/constants';

function NovaAvaliacaoDesempenho({ open, onClose, avaliacao = null, onSubmit }) {
  // ...existing code...
  // Usar AVALIACAO.TIPOS.DESEMPENHO ao invés de TIPOS_AVALIACAO_DESEMPENHO
  // Usar AVALIACAO.STATUS ao invés de STATUS_AVALIACAO
}
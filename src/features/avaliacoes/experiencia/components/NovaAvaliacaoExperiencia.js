import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  // ...imports existentes
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { AVALIACAO } from '../../../../../utils/constants';

function NovaAvaliacaoExperiencia({ open, onClose, avaliacao = null, onSubmit }) {
  // ...existing code...
  // Usar AVALIACAO.TIPOS.EXPERIENCIA ao invés de TIPOS_AVALIACAO_EXPERIENCIA
  // Usar AVALIACAO.STATUS ao invés de STATUS_AVALIACAO
}
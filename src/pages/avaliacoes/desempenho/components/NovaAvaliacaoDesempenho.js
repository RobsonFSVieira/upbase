import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  // ...imports existentes
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { TIPOS_AVALIACAO_DESEMPENHO, STATUS_AVALIACAO } from '../../../../utils/constants';

function NovaAvaliacaoDesempenho({ open, onClose, avaliacao = null, onSubmit }) {
  // ...código existente adaptado para desempenho
  // Alterar TIPOS_AVALIACAO para TIPOS_AVALIACAO_DESEMPENHO
}
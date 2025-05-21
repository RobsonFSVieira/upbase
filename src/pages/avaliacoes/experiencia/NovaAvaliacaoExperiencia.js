import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  // ...imports existentes
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { TIPOS_AVALIACAO_EXPERIENCIA, STATUS_AVALIACAO } from '../../../../utils/constants';

function NovaAvaliacaoExperiencia({ open, onClose, avaliacao = null, onSubmit }) {
  // ...código existente adaptado para experiência
  // Alterar TIPOS_AVALIACAO para TIPOS_AVALIACAO_EXPERIENCIA
}
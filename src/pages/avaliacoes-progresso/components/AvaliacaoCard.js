import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  IconButton,
  Tooltip
} from '@mui/material';
import {
  Visibility as VisibilityIcon,
  GetApp as DownloadIcon
} from '@mui/icons-material';

const AvaliacaoCard = ({ avaliacao }) => {
  return (
    <Card variant="outlined">
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="subtitle1" fontWeight="medium">
            Ciclo {avaliacao.ciclo}
          </Typography>
          <Chip 
            label={avaliacao.status === 'concluida' ? 'Concluída' : 'Em Andamento'}
            color={avaliacao.status === 'concluida' ? 'success' : 'info'}
            size="small"
          />
        </Box>

        <Box sx={{ mt: 2 }}>
          <Typography color="text.secondary" variant="body2">
            Nota Final
          </Typography>
          <Typography variant="h6" color="primary">
            {avaliacao.notaFinal.toFixed(1)}
          </Typography>
        </Box>

        <Box sx={{ mt: 2 }}>
          <Typography variant="caption" color="text.secondary">
            Concluída em: {new Date(avaliacao.data).toLocaleDateString()}
          </Typography>
        </Box>

        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
          <Tooltip title="Visualizar Detalhes">
            <IconButton size="small">
              <VisibilityIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Baixar PDF">
            <IconButton size="small">
              <DownloadIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      </CardContent>
    </Card>
  );
};

export default AvaliacaoCard;

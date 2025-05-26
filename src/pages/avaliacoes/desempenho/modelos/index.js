import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  IconButton,
  Tooltip
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  FileCopy as CopyIcon,
  Delete as DeleteIcon
} from '@mui/icons-material';

const ModelosFormularios = () => {
  const [modelos] = useState([
    {
      id: 1,
      titulo: 'Avaliação Padrão Operacional',
      descricao: 'Modelo para avaliação de operadores',
      criterios: 12,
      ultimaModificacao: '2025-01-15'
    },
    {
      id: 2,
      titulo: 'Avaliação de Liderança',
      descricao: 'Modelo específico para líderes',
      criterios: 15,
      ultimaModificacao: '2025-02-20'
    }
  ]);

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h5">
          Modelos de Formulários
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
        >
          Novo Modelo
        </Button>
      </Box>

      <Grid container spacing={3}>
        {modelos.map((modelo) => (
          <Grid item xs={12} md={6} key={modelo.id}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="h6">
                    {modelo.titulo}
                  </Typography>
                  <Box>
                    <Tooltip title="Editar">
                      <IconButton size="small">
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Duplicar">
                      <IconButton size="small">
                        <CopyIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Excluir">
                      <IconButton size="small">
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </Box>

                <Typography color="text.secondary" paragraph>
                  {modelo.descricao}
                </Typography>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    {modelo.criterios} critérios
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Modificado em: {new Date(modelo.ultimaModificacao).toLocaleDateString()}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ModelosFormularios;

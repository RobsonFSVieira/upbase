import React from 'react';
import {
  Typography,
  Box,
  Card,
  CardContent,
  Rating,
  TextField,
  Grid
} from '@mui/material';

const CRITERIOS_COMPORTAMENTAIS = [
  {
    id: 'trabalho_equipe',
    nome: 'Trabalho em Equipe',
    descricao: 'Capacidade de trabalhar em sinergia, com visão de equipe'
  },
  {
    id: 'sociabilidade',
    nome: 'Sociabilidade',
    descricao: 'Capacidade de interagir bem com os colegas'
  },
  {
    id: 'proatividade',
    nome: 'Proatividade',
    descricao: 'Iniciativa para realizar tarefas e buscar soluções'
  },
  {
    id: 'autocontrole',
    nome: 'Autocontrole',
    descricao: 'Capacidade de manter a calma e o profissionalismo'
  }
];

export default function RevisaoAvaliacao({ data = {}, setData }) {
  const handleChange = (criterioId, field, value) => {
    setData(prev => ({
      ...prev,
      autoAvaliacao: {
        ...prev.autoAvaliacao,
        [criterioId]: {
          ...prev.autoAvaliacao[criterioId],
          [field]: value
        }
      }
    }));
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Avaliação por Pares
      </Typography>
      
      <Typography variant="body2" color="text.secondary" paragraph>
        Avalie o desempenho dos seus colegas nos critérios abaixo.
      </Typography>

      <Grid container spacing={3}>
        {CRITERIOS_COMPORTAMENTAIS.map((criterio) => (
          <Grid item xs={12} key={criterio.id}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {criterio.nome}
                </Typography>
                
                <Typography variant="body2" color="text.secondary" paragraph>
                  {criterio.descricao}
                </Typography>
                
                <Box sx={{ mb: 2 }}>
                  <Typography component="legend" gutterBottom>
                    Nota do colega (1-10):
                  </Typography>
                  <Rating
                    max={10}
                    value={data[criterio.id]?.nota || 0}
                    onChange={(_, newValue) => {
                      handleChange(criterio.id, 'nota', newValue);
                    }}
                  />
                </Box>

                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  label="Justificativa"
                  value={data[criterio.id]?.justificativa || ''}
                  onChange={(e) => handleChange(criterio.id, 'justificativa', e.target.value)}
                  placeholder="Descreva situações que justifiquem a nota dada"
                />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

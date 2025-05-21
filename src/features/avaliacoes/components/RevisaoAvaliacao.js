import React from 'react';
import {
  Typography,
  Box,
  Card,
  CardContent,
  Grid,
  Divider,
  Rating
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

export default function RevisaoAvaliacao({ data = {} }) {
  const calcularMedia = (avaliacoes) => {
    if (!avaliacoes) return 0;
    const notas = Object.values(avaliacoes)
      .map(av => av.nota)
      .filter(Boolean);
    
    return notas.length 
      ? (notas.reduce((a, b) => a + b, 0) / notas.length).toFixed(1)
      : 0;
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Revisão da Avaliação
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Sua Autoavaliação
              </Typography>
              <Typography variant="h4" color="primary" gutterBottom>
                {calcularMedia(data.autoAvaliacao)}
              </Typography>
              <Divider sx={{ my: 2 }} />
              {CRITERIOS_COMPORTAMENTAIS.map((criterio) => (
                <Box key={criterio.id} sx={{ mb: 2 }}>
                  <Typography variant="subtitle1">{criterio.nome}</Typography>
                  <Rating 
                    value={data.autoAvaliacao?.[criterio.id]?.nota || 0}
                    readOnly
                    max={10}
                  />
                  <Typography variant="body2" color="text.secondary">
                    {data.autoAvaliacao?.[criterio.id]?.justificativa || 'Sem justificativa'}
                  </Typography>
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Avaliação dos Pares
              </Typography>
              <Typography variant="h4" color="primary" gutterBottom>
                {calcularMedia(data.avaliacaoPares)}
              </Typography>
              <Divider sx={{ my: 2 }} />
              {/* Resumo das avaliações dos pares */}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

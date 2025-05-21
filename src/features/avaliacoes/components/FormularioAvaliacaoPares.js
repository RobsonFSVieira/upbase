import React, { useState } from 'react';
import {
  Typography,
  Box,
  Card,
  CardContent,
  Rating,
  TextField,
  Grid,
  Tabs,
  Tab,
  Divider
} from '@mui/material';

const COLEGAS_TURNO = [
  { id: 'andrew', nome: 'Andrew Silva' },
  { id: 'bruna', nome: 'Bruna Oliveira' },
  { id: 'carlos', nome: 'Carlos Mendes' }
];

// Usando os mesmos critérios do FormularioAutoAvaliacao
const CRITERIOS_COMPORTAMENTAIS = [
  {
    id: 'trabalho_equipe',
    nome: 'Trabalho em Equipe',
    descricao: 'Capacidade de trabalhar em sinergia, com visão de equipe'
  },
  // ...outros critérios...
];

export default function FormularioAvaliacaoPares({ data = {}, setData }) {
  const [selectedColega, setSelectedColega] = useState(0);

  const handleChange = (colegaId, criterioId, field, value) => {
    setData(prev => ({
      ...prev,
      avaliacaoPares: {
        ...prev.avaliacaoPares,
        [colegaId]: {
          ...(prev.avaliacaoPares[colegaId] || {}),
          [criterioId]: {
            ...(prev.avaliacaoPares[colegaId]?.[criterioId] || {}),
            [field]: value
          }
        }
      }
    }));
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Avaliação dos Pares
      </Typography>

      <Tabs
        value={selectedColega}
        onChange={(_, newValue) => setSelectedColega(newValue)}
        variant="scrollable"
        scrollButtons="auto"
        sx={{ mb: 3 }}
      >
        {COLEGAS_TURNO.map((colega) => (
          <Tab key={colega.id} label={colega.nome} />
        ))}
      </Tabs>

      {COLEGAS_TURNO[selectedColega] && (
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
                    <Rating
                      max={10}
                      value={data[COLEGAS_TURNO[selectedColega].id]?.[criterio.id]?.nota || 0}
                      onChange={(_, newValue) => {
                        handleChange(
                          COLEGAS_TURNO[selectedColega].id,
                          criterio.id,
                          'nota',
                          newValue
                        );
                      }}
                    />
                  </Box>
                  <TextField
                    fullWidth
                    multiline
                    rows={2}
                    label="Comentários"
                    value={data[COLEGAS_TURNO[selectedColega].id]?.[criterio.id]?.comentario || ''}
                    onChange={(e) => {
                      handleChange(
                        COLEGAS_TURNO[selectedColega].id,
                        criterio.id,
                        'comentario',
                        e.target.value
                      );
                    }}
                  />
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}

import React from 'react';
import { Card, CardContent, Typography, Box, List, ListItem, ListItemText, Divider } from '@mui/material';
import { TrendingUp } from '@mui/icons-material';

const UltimosResultadosCard = () => {
  const resultados = [
    { nome: 'João Silva', nota: 4.8 },
    { nome: 'Maria Santos', nota: 4.5 },
    { nome: 'Pedro Oliveira', nota: 4.2 }
  ];

  return (
    <Card>
      <CardContent>
        <Box display="flex" alignItems="center" gap={1} mb={2}>
          <TrendingUp color="success" />
          <Typography variant="h6">Últimos Resultados</Typography>
        </Box>

        <List>
          {resultados.map((resultado, index) => (
            <React.Fragment key={resultado.nome}>
              <ListItem>
                <ListItemText
                  primary={resultado.nome}
                  secondary={`Nota final: ${resultado.nota}`}
                />
              </ListItem>
              {index < resultados.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default UltimosResultadosCard;

import React from 'react';
import { Typography, Grid, Card, CardContent, CardActionArea } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Assessment, Timeline } from '@mui/icons-material';

export default function Avaliacoes() {
  const navigate = useNavigate();
  
  const avaliacoes = [
    {
      title: 'Avaliações de Desempenho',
      description: 'Gerencie avaliações de desempenho dos colaboradores',
      icon: <Assessment sx={{ fontSize: 40, color: 'primary.main' }} />,
      path: '/avaliacoes/desempenho'
    },
    {
      title: 'Avaliações de Experiência',
      description: 'Gerencie avaliações de período de experiência',
      icon: <Timeline sx={{ fontSize: 40, color: 'primary.main' }} />,
      path: '/avaliacoes/experiencia'
    }
  ];

  return (
    <>
      <Typography variant="h5" sx={{ mb: 4 }} fontWeight="bold">
        Avaliações
      </Typography>
      
      <Grid container spacing={3}>
        {avaliacoes.map((item) => (
          <Grid item xs={12} sm={6} key={item.path}>
            <Card>
              <CardActionArea onClick={() => navigate(item.path)}>
                <CardContent sx={{ 
                  display: 'flex', 
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  p: 4 
                }}>
                  {item.icon}
                  <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
                    {item.title}
                  </Typography>
                  <Typography color="text.secondary">
                    {item.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
}

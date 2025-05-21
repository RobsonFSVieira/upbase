import React from 'react';
import { Grid, Card, CardContent, Typography, CardActionArea, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Assessment, WorkHistory } from '@mui/icons-material';

export default function Avaliacoes() {
  const navigate = useNavigate();

  const options = [
    {
      title: 'Avaliação de Desempenho',
      description: 'Gestão de avaliações de desempenho dos colaboradores',
      icon: <Assessment sx={{ fontSize: 40, color: 'primary.main' }} />,
      path: '/avaliacoes/desempenho'
    },
    {
      title: 'Avaliação de Experiência',
      description: 'Gestão de avaliações de período de experiência',
      icon: <WorkHistory sx={{ fontSize: 40, color: 'primary.main' }} />,
      path: '/avaliacoes/experiencia'
    }
  ];

  return (
    <Box>
      <Typography variant="h5" gutterBottom fontWeight="bold">
        Avaliações
      </Typography>
      <Grid container spacing={3} mt={1}>
        {options.map((option) => (
          <Grid item xs={12} md={6} key={option.path}>
            <Card>
              <CardActionArea onClick={() => navigate(option.path)}>
                <CardContent sx={{ 
                  p: 4, 
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'center', 
                  textAlign: 'center' 
                }}>
                  {option.icon}
                  <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
                    {option.title}
                  </Typography>
                  <Typography color="text.secondary">
                    {option.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

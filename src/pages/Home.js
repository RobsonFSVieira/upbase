import React from 'react';
import { Grid, Card, CardContent, Typography, Box, Container } from '@mui/material';
import {
  Assessment,
  Group,
  Feedback,
  TrendingUp,
} from '@mui/icons-material';

function Home() {
  const cards = [
    {
      title: 'Avaliações Pendentes',
      value: '5',
      icon: <Assessment />,
      color: '#FF934C',
    },
    {
      title: 'Colaboradores',
      value: '25',
      icon: <Group />,
      color: '#0F2747',
    },
    {
      title: 'Feedbacks do Mês',
      value: '12',
      icon: <Feedback />,
      color: '#2D5A9D',
    },
    {
      title: 'Taxa de Crescimento',
      value: '15%',
      icon: <TrendingUp />,
      color: '#34D399',
    },
  ];

  return (
    <Container maxWidth="lg">
      <Box sx={{ 
        mt: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Bem-vindo ao UPBase
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Sistema de Gestão Integrada de Pessoas
        </Typography>
      </Box>

      <Box sx={{ p: 3 }}>
        <Typography variant="h4" sx={{ mb: 4 }}>
          Dashboard
        </Typography>
        
        <Grid container spacing={3}>
          {cards.map((card) => (
            <Grid item xs={12} sm={6} md={3} key={card.title}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                  overflow: 'hidden',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    transition: 'transform 0.2s ease-in-out',
                  },
                }}
              >
                <CardContent>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <Typography color="textSecondary" variant="h6">
                      {card.title}
                    </Typography>
                    <Box
                      sx={{
                        backgroundColor: `${card.color}15`,
                        p: 1,
                        borderRadius: '50%',
                      }}
                    >
                      {React.cloneElement(card.icon, {
                        sx: { color: card.color },
                      })}
                    </Box>
                  </Box>
                  <Typography variant="h4" sx={{ mt: 2, color: card.color }}>
                    {card.value}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
}

export default Home;
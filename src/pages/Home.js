import React from 'react';
import { Box, Typography, Container } from '@mui/material';

function Home() {
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
    </Container>
  );
}

export default Home;
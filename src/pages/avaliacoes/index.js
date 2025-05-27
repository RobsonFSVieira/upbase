import React from 'react';
import { Box, Grid, Card, CardContent, Typography, Button } from '@mui/material';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import PageHeader from '../../components/common/PageHeader';

const Avaliacoes = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Box>
      {location.pathname === '/avaliacoes' && (
        <PageHeader
          title="Desempenho"
          helpText="Central de Avaliações de Desempenho"
        />
      )}
      {location.pathname === '/avaliacoes' ? (
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="body2" color="text.secondary" paragraph>
                  Gerencie avaliações de desempenho dos colaboradores. Acompanhe o progresso,
                  configure ciclos de avaliação e visualize resultados.
                </Typography>
                <Button
                  variant="contained"
                  onClick={() => navigate('/avaliacoes/desempenho')}
                >
                  Acessar
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      ) : null}
      <Box sx={{ mt: 3 }}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default Avaliacoes;

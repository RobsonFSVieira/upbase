import React from 'react';
import { Box, Typography } from '@mui/material';
import PageHeader from '../../components/common/PageHeader';

const Home = () => {
  return (
    <Box>
      <PageHeader 
        title="Dashboard"
        helpText="Visão geral do sistema"
      />
      <Typography variant="body1">
        Bem-vindo ao Upbase
      </Typography>
    </Box>
  );
};

export default Home;

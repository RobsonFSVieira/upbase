import React from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  Alert
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Logo from '../../assets/images/logo-official.png';

const PendingApproval = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        bgcolor: 'background.default',
        pt: { xs: 4, sm: 8 }
      }}
    >
      <Paper elevation={3} sx={{ p: 4, width: '100%', maxWidth: 400 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
          <img src={Logo} alt="Upbase Logo" style={{ height: 80, marginBottom: 24 }} />
          <Typography variant="h5" gutterBottom>Cadastro Realizado!</Typography>
        </Box>

        <Alert severity="info" sx={{ mb: 3 }}>
          Seu cadastro foi recebido e está aguardando aprovação do administrador.
        </Alert>

        <Typography variant="body1" paragraph>
          Você receberá um e-mail assim que sua conta for aprovada.
        </Typography>

        <Button
          fullWidth
          variant="contained"
          onClick={() => navigate('/login')}
          sx={{ mt: 2 }}
        >
          Voltar para Login
        </Button>
      </Paper>
    </Box>
  );
};

export default PendingApproval;

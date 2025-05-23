import React from 'react';
import {
  Box,
  Paper,
  Typography,
  Alert,
  Button
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

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
      <Paper sx={{ p: 4, maxWidth: 500, width: '100%' }}>
        <Alert severity="info" sx={{ mb: 3 }}>
          Cadastro realizado com sucesso!
        </Alert>
        
        <Typography variant="h6" gutterBottom>
          Aguardando Aprovação
        </Typography>
        
        <Typography paragraph>
          Seu cadastro foi recebido e está aguardando aprovação do administrador.
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

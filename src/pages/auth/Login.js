import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  Alert,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { Link as MuiLink } from '@mui/material';
import Logo from '../../assets/images/logo-official.png';
import { useAuth } from '../../contexts/AuthContext';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ 
    emailPrefix: '', // Mudamos de email para emailPrefix
    password: '' 
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (credentials.emailPrefix && credentials.password) {
        const email = `${credentials.emailPrefix}@grupocesari.com.br`;
        await login(email, credentials.password);
        navigate('/');
      } else {
        setError('Por favor, preencha todos os campos');
      }
    } catch (error) {
      setError(error.message || 'Erro ao fazer login');
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'flex-start', // Alterado de 'center' para 'flex-start'
        justifyContent: 'center',
        bgcolor: 'background.default',
        pt: { xs: 4, sm: 8 } // Adiciona padding-top para mover para cima
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          width: '100%',
          maxWidth: 400,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <img 
          src={Logo} 
          alt="Upbase Logo" 
          style={{ height: 80, marginBottom: 24 }}
        />

        <Typography variant="h5" gutterBottom>
          Login
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2, width: '100%' }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <TextField
              sx={{ flexGrow: 1 }}
              label="E-mail" // Corrigido para "E-mail" com hífen
              value={credentials.emailPrefix}
              onChange={(e) => setCredentials(prev => ({ 
                ...prev, 
                emailPrefix: e.target.value.toLowerCase()
              }))}
              placeholder="joao.silva"
            />
            <Typography
              sx={{
                ml: 1,
                color: 'text.secondary',
                whiteSpace: 'nowrap'
              }}
            >
              @grupocesari.com.br
            </Typography>
          </Box>

          <TextField
            fullWidth
            label="Senha"
            type="password"
            margin="normal"
            value={credentials.password}
            onChange={(e) => setCredentials(prev => ({ 
              ...prev, 
              password: e.target.value 
            }))}
          />

          <Button
            fullWidth
            type="submit"
            variant="contained"
            sx={{ mt: 3 }}
          >
            Entrar
          </Button>
        </Box>

        <Box sx={{ mt: 2, width: '100%', textAlign: 'center' }}>
          <MuiLink
            component={RouterLink}
            to="/register"
            variant="body2"
            sx={{
              textDecoration: 'none',
              '&:hover': {
                textDecoration: 'underline'
              }
            }}
          >
            Não tem uma conta? Cadastre-se
          </MuiLink>
        </Box>
      </Paper>
    </Box>
  );
};

export default Login;

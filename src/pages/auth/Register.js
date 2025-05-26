import React, { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  Alert,
  Link as MuiLink,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import Logo from '../../assets/images/logo-official.png';
import { register } from '../../services/authService'; // Importe o serviço de registro

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    emailPrefix: '', // Alterado de email para emailPrefix
    password: '',
    confirmPassword: '',
    turno: '',
    matricula: ''
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Validar senha
      if (formData.password !== formData.confirmPassword) {
        setError('As senhas não coincidem');
        return;
      }

      const response = await register(formData);
      if (response.success) {
        // Redirecionar para página de aprovação pendente
        navigate('/register/pending');
      }
    } catch (error) {
      setError(error.message || 'Erro ao realizar cadastro');
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', bgcolor: 'background.default', pt: { xs: 4, sm: 8 } }}>
      <Paper elevation={3} sx={{ p: 4, width: '100%', maxWidth: 400, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <img src={Logo} alt="Upbase Logo" style={{ height: 80, marginBottom: 24 }} />
        
        <Typography variant="h5" gutterBottom>Cadastro</Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2, width: '100%' }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
          <TextField
            fullWidth
            label="Nome Completo"
            margin="normal"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
          />

          <TextField
            fullWidth
            label="Matrícula"
            margin="normal"
            value={formData.matricula}
            onChange={(e) => setFormData(prev => ({ ...prev, matricula: e.target.value }))}
          />

          <FormControl fullWidth margin="normal">
            <InputLabel>Turno</InputLabel>
            <Select
              value={formData.turno}
              label="Turno"
              onChange={(e) => setFormData(prev => ({ ...prev, turno: e.target.value }))}
            >
              <MenuItem value="A">Turno A</MenuItem>
              <MenuItem value="B">Turno B</MenuItem>
              <MenuItem value="C">Turno C</MenuItem>
              <MenuItem value="D">Turno D</MenuItem>
              <MenuItem value="ADM">Administrativo</MenuItem>
            </Select>
          </FormControl>

          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <TextField
              sx={{ flexGrow: 1 }}
              label="E-mail"
              value={formData.emailPrefix}
              onChange={(e) => setFormData(prev => ({
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
            value={formData.password}
            onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
          />

          <TextField
            fullWidth
            label="Confirmar Senha"
            type="password"
            margin="normal"
            value={formData.confirmPassword}
            onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
          />

          <Button
            fullWidth
            type="submit"
            variant="contained"
            sx={{ mt: 3 }}
          >
            Cadastrar
          </Button>

          <Box sx={{ mt: 2, textAlign: 'center' }}>
            <MuiLink
              component={RouterLink}
              to="/login"
              variant="body2"
              sx={{
                textDecoration: 'none',
                '&:hover': {
                  textDecoration: 'underline'
                }
              }}
            >
              Já tem uma conta? Faça login
            </MuiLink>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default Register;

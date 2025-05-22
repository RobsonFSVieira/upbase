import React, { useState } from 'react';
import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  CircularProgress
} from '@mui/material';
import { supabase } from '../../services/supabase';

const TURNOS = ['A', 'B', 'C', 'D', 'ADM', 'Aprendiz'];

const Register = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    nomeCompleto: '',
    re: '',
    funcao: '',
    turno: '',
    dataNascimento: '',
    dataAdmissao: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // 1. Criar usuário no Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
      });

      if (authError) throw authError;

      // 2. Criar perfil do usuário
      const { error: profileError } = await supabase
        .from('user_profiles')
        .insert({
          id: authData.user.id,
          nome_completo: formData.nomeCompleto,
          re: formData.re,
          funcao: formData.funcao,
          turno: formData.turno,
          data_nascimento: formData.dataNascimento,
          data_admissao: formData.dataAdmissao,
          tipo: 'colaborador',
          status: 'pendente' // Aguardando aprovação do admin
        });

      if (profileError) throw profileError;

      // 3. Notificar administradores
      await supabase.from('notifications')
        .insert({
          type: 'new_user',
          title: 'Novo usuário registrado',
          message: `${formData.nomeCompleto} (${formData.email}) aguarda aprovação`,
          user_type: 'admin'
        });

    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const validateEmail = (email) => {
    return email.toLowerCase().endsWith('@grupocesari.com.br');
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
      <Paper elevation={3} sx={{ p: 4, width: '100%', maxWidth: 500 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Cadastro de Usuário
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            required
            label="E-mail Corporativo"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            error={formData.email && !validateEmail(formData.email)}
            helperText={formData.email && !validateEmail(formData.email) ? 
              "Use seu email @grupocesari.com.br" : ""}
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            required
            label="Senha"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            required
            label="Nome Completo"
            name="nomeCompleto"
            value={formData.nomeCompleto}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            required
            label="RE"
            name="re"
            value={formData.re}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            label="Função"
            name="funcao"
            value={formData.funcao}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />

          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Turno *</InputLabel>
            <Select
              required
              name="turno"
              value={formData.turno}
              onChange={handleChange}
              label="Turno *"
            >
              {TURNOS.map(turno => (
                <MenuItem key={turno} value={turno}>
                  {turno}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            fullWidth
            required
            label="Data de Nascimento"
            name="dataNascimento"
            type="date"
            value={formData.dataNascimento}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            label="Data de Admissão"
            name="dataAdmissao"
            type="date"
            value={formData.dataAdmissao}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            sx={{ mb: 2 }}
          />

          <Button
            fullWidth
            type="submit"
            variant="contained"
            disabled={loading}
            sx={{ mt: 2 }}
          >
            {loading ? <CircularProgress size={24} /> : 'Cadastrar'}
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default Register;

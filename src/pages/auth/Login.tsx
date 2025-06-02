import React, { useState } from 'react';
import {
    Box,
    TextField,
    Button,
    Alert,
    CircularProgress,
    FormControl,
    InputLabel,
    Select,
    MenuItem
} from '@mui/material';
import { useAuth } from '../../hooks/useAuth';
import { Link } from 'react-router-dom';

const RegisterTest = () => {
    const { signUp } = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        name: '',
        matricula: '',
        turno: ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        try {
            const { email, password, ...userData } = formData;
            await signUp(email, password, userData);
            setSuccess('Usuário registrado com sucesso! Aguardando aprovação.');
            setFormData({ email: '', password: '', name: '', matricula: '', turno: '' });
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Erro ao registrar usuário');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box sx={{ maxWidth: 400, mx: 'auto', mt: 4, p: 2 }}>
            <form onSubmit={handleSubmit}>
                {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
                {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

                <TextField
                    fullWidth
                    label="Email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    margin="normal"
                />

                <TextField
                    fullWidth
                    label="Senha"
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                    margin="normal"
                />

                <TextField
                    fullWidth
                    label="Nome Completo"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    margin="normal"
                />

                <TextField
                    fullWidth
                    label="Matrícula"
                    value={formData.matricula}
                    onChange={(e) => setFormData(prev => ({ ...prev, matricula: e.target.value }))}
                    margin="normal"
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

                <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    disabled={loading}
                    sx={{ mt: 2 }}
                >
                    {loading ? <CircularProgress size={24} /> : 'Registrar'}
                </Button>
            </form>
            <Button
                component={Link}
                to="/register-test"
                variant="text"
                sx={{ mt: 2 }}
            >
                Testar Registro
            </Button>
        </Box>
    );
};

export default RegisterTest;
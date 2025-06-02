import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Construction } from '@mui/icons-material';

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '60vh',
                textAlign: 'center',
                gap: 2
            }}
        >
            <Construction sx={{ fontSize: 64, color: 'primary.main' }} />
            <Typography variant="h4" gutterBottom>
                Página em Desenvolvimento
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
                Esta funcionalidade ainda está sendo construída.
            </Typography>
            <Button
                variant="contained"
                onClick={() => navigate('/')}
            >
                Voltar para Dashboard
            </Button>
        </Box>
    );
};

export default NotFound;

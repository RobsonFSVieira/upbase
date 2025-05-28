import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Box, Tabs, Tab, Paper } from '@mui/material';
import { useAuth } from '../../../../contexts/AuthContext';
import { useViewPreferences } from '../../../../contexts/ViewPreferencesContext';

const NavigationTabs = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { user } = useAuth();
    const { preferences } = useViewPreferences();

    // Define as tabs disponíveis para cada perfil de usuário
    const tabs = {
        lider: [
            { label: 'Dashboard', path: '' },
            { label: 'Modelos de Formulários', path: 'modelos' },
            { label: 'Gerenciamento', path: 'gerenciar' },
            { label: 'Relatórios', path: 'relatorios' }
        ],
        colaborador: [
            { label: 'Minhas Avaliações', path: '' },
            { label: 'Histórico', path: 'historico' }
        ]
    };

    // Seleciona as tabs apropriadas com base no papel do usuário
    const userTabs = tabs[user?.role] || tabs.colaborador;

    // Calcula o índice da tab atual com base na URL
    const getCurrentTabIndex = () => {
        const currentPath = location.pathname.split('/avaliacoes/desempenho/')[1] || '';
        const index = userTabs.findIndex(tab => tab.path === currentPath);
        return index === -1 ? 0 : index;
    };

    // Handler para mudança de tab
    const handleTabChange = (event, newValue) => {
        const targetPath = userTabs[newValue].path;
        navigate(targetPath ? `/avaliacoes/desempenho/${targetPath}` : '/avaliacoes/desempenho', { replace: true });
    };

    return (
        <Paper sx={{ mb: 3 }}>
            <Tabs
                value={getCurrentTabIndex()}
                onChange={handleTabChange}
                variant="scrollable"
                scrollButtons="auto"
                sx={{
                    borderBottom: 1,
                    borderColor: 'divider',
                    '& .MuiTab-root': {
                        minWidth: 120
                    }
                }}
            >
                {userTabs.map(tab => (
                    <Tab key={tab.path} label={tab.label} />
                ))}
            </Tabs>
        </Paper>
    );
};

export default NavigationTabs;

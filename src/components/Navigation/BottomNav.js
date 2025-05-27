import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Paper, BottomNavigation, BottomNavigationAction, Box } from '@mui/material';
import {
    Home as HomeIcon,
    Assessment,
    CalendarMonth as CalendarIcon,
    Message as MessageIcon,
    Person as PersonIcon,
    NotificationsOutlined
} from '@mui/icons-material';

const BottomNav = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const getActiveRoute = () => {
        const path = location.pathname;
        if (path === '/') return 0;
        if (path.includes('/avaliacoes')) return 1;
        if (path.includes('/escalas')) return 2;
        if (path.includes('/feedbacks')) return 3;
        if (path.includes('/profile')) return 4;
        return 0;
    };

    return (
        <Paper
            sx={{
                position: 'fixed',
                bottom: 0,
                left: 0,
                right: 0,
                display: { xs: 'block', sm: 'none' },
                zIndex: 1100,
            }}
            elevation={3}
        >
            <BottomNavigation
                showLabels
                value={getActiveRoute()}
                onChange={(event, newValue) => {
                    switch (newValue) {
                        case 0:
                            navigate('/');
                            break;
                        case 1:
                            navigate('/avaliacoes');
                            break;
                        case 2:
                            navigate('/escalas');
                            break;
                        case 3:
                            navigate('/feedbacks');
                            break;
                        case 4:
                            navigate('/profile');
                            break;
                        default:
                            break;
                    }
                }}
            >                <BottomNavigationAction label="Início" icon={<HomeIcon />} />
                <BottomNavigationAction label="Avaliações" icon={<Assessment />} />
                <BottomNavigationAction
                    label="Notificações"
                    icon={
                        <Box sx={{ position: 'relative' }}>
                            <NotificationsOutlined />
                            <Box
                                sx={{
                                    position: 'absolute',
                                    top: -2,
                                    right: -2,
                                    width: 8,
                                    height: 8,
                                    borderRadius: '50%',
                                    backgroundColor: 'error.main',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}
                            />
                        </Box>
                    }
                />
                <BottomNavigationAction label="Mensagens" icon={<MessageIcon />} />
                <BottomNavigationAction label="Perfil" icon={<PersonIcon />} />
            </BottomNavigation>
        </Paper>
    );
};

export default BottomNav;

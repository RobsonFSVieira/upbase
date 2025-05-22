import React, { useState } from 'react';
import {
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Typography,
  Box
} from '@mui/material';
import {
  AccountCircle,
  Settings,
  Notifications,
  HelpOutline,
  ExitToApp,
  LightMode,
  DarkMode
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';

const UserMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { user, logout } = useAuth();
  const { toggleTheme, isDarkMode } = useTheme();
  const navigate = useNavigate();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleProfile = () => {
    navigate('/profile');
    handleClose();
  };

  const handleSettings = () => {
    navigate('/settings');
    handleClose();
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  return (
    <>
      <IconButton
        size="large"
        onClick={handleMenu}
        color="inherit"
        edge="end"
      >
        <Avatar sx={{ width: 32, height: 32 }}>
          {user?.name?.[0]?.toUpperCase() || <AccountCircle />}
        </Avatar>
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        PaperProps={{
          sx: { width: 320, maxWidth: '100%' }
        }}
      >
        <Box sx={{ px: 2, py: 1.5 }}>
          <Typography variant="subtitle1" noWrap>
            {user?.name || 'Usuário'}
          </Typography>
          <Typography variant="body2" color="text.secondary" noWrap>
            {user?.role === 'lider' ? 'Líder' : 'Colaborador'}
          </Typography>
        </Box>
        
        <Divider />
        
        <MenuItem onClick={handleProfile}>
          <ListItemIcon>
            <AccountCircle />
          </ListItemIcon>
          <ListItemText 
            primary="Meu Perfil"
            secondary="Informações pessoais e preferências"
          />
        </MenuItem>

        <MenuItem onClick={handleSettings}>
          <ListItemIcon>
            <Settings />
          </ListItemIcon>
          <ListItemText 
            primary="Configurações"
            secondary="Ajustes do sistema"
          />
        </MenuItem>

        <MenuItem onClick={toggleTheme}>
          <ListItemIcon>
            {isDarkMode ? <LightMode /> : <DarkMode />}
          </ListItemIcon>
          <ListItemText 
            primary={isDarkMode ? 'Modo Claro' : 'Modo Escuro'}
            secondary="Alternar tema do sistema"
          />
        </MenuItem>

        <Divider />

        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <ExitToApp />
          </ListItemIcon>
          <ListItemText 
            primary="Sair"
            secondary="Encerrar sessão"
          />
        </MenuItem>
      </Menu>
    </>
  );
};

export default UserMenu;

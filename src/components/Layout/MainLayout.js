import React, { useState } from 'react';
import {
  AppBar,
  Box,
  CssBaseline,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import {
  Menu as MenuIcon,
  LightMode,
  DarkMode,
  NotificationsOutlined,
  AccountCircleOutlined,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useTheme as useThemeContext } from '../../contexts/ThemeContext';
import Logo from '../../assets/images/logo-official.png';
import {
  Dashboard,
  AssessmentOutlined,
  GroupOutlined,
  FeedbackOutlined,
} from '@mui/icons-material';

const DRAWER_WIDTH = 240;

const menuItems = [
  {
    text: 'Dashboard',
    icon: (
      <Dashboard
        sx={{
          color: (theme) =>
            theme.palette.mode === 'light' ? '#FFFFFF' : '#94A3B8',
          fontSize: '24px',
        }}
      />
    ),
    path: '/',
  },
  {
    text: 'Avaliações',
    icon: (
      <AssessmentOutlined
        sx={{
          color: (theme) =>
            theme.palette.mode === 'light' ? '#FFFFFF' : '#94A3B8',
          fontSize: '24px',
        }}
      />
    ),
    path: '/avaliacoes',
  },
  {
    text: 'Colaboradores',
    icon: (
      <GroupOutlined
        sx={{
          color: (theme) =>
            theme.palette.mode === 'light' ? '#FFFFFF' : '#94A3B8',
          fontSize: '24px',
        }}
      />
    ),
    path: '/colaboradores',
  },
  {
    text: 'Feedbacks',
    icon: (
      <FeedbackOutlined
        sx={{
          color: (theme) =>
            theme.palette.mode === 'light' ? '#FFFFFF' : '#94A3B8',
          fontSize: '24px',
        }}
      />
    ),
    path: '/feedbacks',
  },
];

function MainLayout({ children }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [logoError, setLogoError] = useState(false); // Adicionando o state para o logo
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();
  const { isDarkMode, toggleTheme } = useThemeContext();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Toolbar />
      <List>
        {menuItems.map((item) => (
          <ListItem
            button
            key={item.text}
            onClick={() => {
              navigate(item.path);
              if (isMobile) handleDrawerToggle();
            }}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          zIndex: theme.zIndex.drawer + 1,
          backdropFilter: 'blur(8px)',
          backgroundColor:
            theme.palette.mode === 'light'
              ? 'rgba(255, 255, 255, 0.9)'
              : 'rgba(26, 44, 52, 0.9)',
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{
              mr: 2,
              display: { sm: 'none' },
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.04)',
              },
            }}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
            {!logoError && (
              <img
                src={Logo}
                alt="UPBase Logo"
                style={{
                  height: '80px', // Aumentado de 60px para 80px
                  marginRight: '20px',
                  transition: 'transform 0.2s',
                  padding: '4px',
                }}
                onError={(e) => {
                  console.error('Erro ao carregar logo:', e);
                  setLogoError(true);
                }}
              />
            )}
          </Box>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <IconButton
              color="inherit"
              sx={{
                color: theme.palette.mode === 'light' ? '#0F2747' : '#FFFFFF',
              }}
            >
              <NotificationsOutlined sx={{ fontSize: '24px' }} />
            </IconButton>
            <IconButton
              color="inherit"
              sx={{
                color: theme.palette.mode === 'light' ? '#0F2747' : '#FFFFFF',
              }}
            >
              <AccountCircleOutlined sx={{ fontSize: '24px' }} />
            </IconButton>
            <IconButton
              color="inherit"
              onClick={toggleTheme}
              sx={{
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'scale(1.1)',
                },
                color: theme.palette.mode === 'light' ? '#0F2747' : '#FFFFFF',
              }}
            >
              {isDarkMode ? (
                <LightMode sx={{ fontSize: '24px' }} />
              ) : (
                <DarkMode sx={{ fontSize: '24px' }} />
              )}
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      <Box
        component="nav"
        sx={{ width: { sm: DRAWER_WIDTH }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          variant={isMobile ? 'temporary' : 'permanent'}
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: DRAWER_WIDTH,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${DRAWER_WIDTH}px)` },
          mt: ['48px', '56px', '64px'],
        }}
      >
        {children}
      </Box>
    </Box>
  );
}

export default MainLayout;
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
    subItems: [
      {
        text: 'Desempenho',
        path: '/avaliacoes/desempenho',
      },
      {
        text: 'Experiência',
        path: '/avaliacoes/experiencia',
      },
    ],
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
          <React.Fragment key={item.text}>
            <ListItem
              button
              onClick={() => {
                navigate(item.path);
                if (isMobile) handleDrawerToggle();
              }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
            {item.subItems && (
              <List component="div" disablePadding>
                {item.subItems.map((subItem) => (
                  <ListItem
                    button
                    key={subItem.path}
                    sx={{ pl: 4 }}
                    onClick={() => {
                      navigate(subItem.path);
                      if (isMobile) handleDrawerToggle();
                    }}
                  >
                    <ListItemText primary={subItem.text} />
                  </ListItem>
                ))}
              </List>
            )}
          </React.Fragment>
        ))}
      </List>
    </div>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          zIndex: theme.zIndex.drawer + 1,
          backdropFilter: 'blur(12px)',
          backgroundColor:
            theme.palette.mode === 'light'
              ? 'rgba(255, 255, 255, 0.85)'
              : 'rgba(15, 39, 71, 0.85)',
          borderBottom:
            theme.palette.mode === 'light'
              ? '1px solid rgba(231, 235, 240, 0.8)'
              : '1px solid rgba(255, 255, 255, 0.05)',
          '@media (max-width: 600px)': {
            position: 'fixed',
            width: '100%',
            top: 0,
          },
        }}
      >
        <Toolbar
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 2,
            minHeight: { xs: '64px', sm: '70px' },
            px: { xs: 2, sm: 3 },
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <IconButton
              color="inherit"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{
                display: { sm: 'none' },
                color: theme.palette.mode === 'light' ? '#0F2747' : '#FFFFFF',
                '&:hover': {
                  backgroundColor:
                    theme.palette.mode === 'light'
                      ? 'rgba(15, 39, 71, 0.08)'
                      : 'rgba(255, 255, 255, 0.08)',
                },
              }}
            >
              <MenuIcon sx={{ fontSize: 24 }} />
            </IconButton>
            {!logoError && (
              <img
                src={Logo}
                alt="UPBase Logo"
                style={{
                  height: theme.breakpoints.values.sm ? '50px' : '65px',
                  transition: 'transform 0.2s',
                }}
                onError={(e) => {
                  console.error('Erro ao carregar logo:', e);
                  setLogoError(true);
                }}
              />
            )}
          </Box>

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: { xs: 1, sm: 2 },
            }}
          >
            <IconButton
              sx={{
                color: theme.palette.mode === 'light' ? '#0F2747' : '#FFFFFF',
                '&:hover': {
                  backgroundColor:
                    theme.palette.mode === 'light'
                      ? 'rgba(15, 39, 71, 0.08)'
                      : 'rgba(255, 255, 255, 0.08)',
                },
              }}
            >
              <NotificationsOutlined sx={{ fontSize: 22 }} />
            </IconButton>
            <IconButton
              sx={{
                color: theme.palette.mode === 'light' ? '#0F2747' : '#FFFFFF',
                '&:hover': {
                  backgroundColor:
                    theme.palette.mode === 'light'
                      ? 'rgba(15, 39, 71, 0.08)'
                      : 'rgba(255, 255, 255, 0.08)',
                },
              }}
            >
              <AccountCircleOutlined sx={{ fontSize: 22 }} />
            </IconButton>
            <IconButton
              onClick={toggleTheme}
              sx={{
                color: theme.palette.mode === 'light' ? '#0F2747' : '#FFFFFF',
                '&:hover': {
                  backgroundColor:
                    theme.palette.mode === 'light'
                      ? 'rgba(15, 39, 71, 0.08)'
                      : 'rgba(255, 255, 255, 0.08)',
                  transform: 'scale(1.1)',
                },
                transition: 'all 0.2s',
              }}
            >
              {isDarkMode ? (
                <LightMode sx={{ fontSize: 22 }} />
              ) : (
                <DarkMode sx={{ fontSize: 22 }} />
              )}
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      <Box
        component="nav"
        sx={{
          width: { sm: DRAWER_WIDTH },
          flexShrink: { sm: 0 },
        }}
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
              mt: { sm: '70px' },
              height: { sm: 'calc(100% - 70px)' },
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
          p: { xs: 2, sm: 3 },
          width: { sm: `calc(100% - ${DRAWER_WIDTH}px)` },
          mt: { xs: '64px', sm: '70px' },
        }}
      >
        {children}
      </Box>
    </Box>
  );
}

export default MainLayout;
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
  Dashboard as DashboardIcon,
  Assessment as AssessmentIcon,
  People as PeopleIcon,
  Feedback as FeedbackIcon,
  Brightness4,
  Brightness7,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useTheme as useThemeContext } from '../../contexts/ThemeContext';

const DRAWER_WIDTH = 240;

const menuItems = [
  { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
  { text: 'Avaliações', icon: <AssessmentIcon />, path: '/avaliacoes' },
  { text: 'Colaboradores', icon: <PeopleIcon />, path: '/colaboradores' },
  { text: 'Feedbacks', icon: <FeedbackIcon />, path: '/feedbacks' },
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
      <AppBar position="fixed" sx={{ zIndex: theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
            {!logoError && (
              <img
                src="/images/logo.png"
                alt="UPBase Logo"
                style={{
                  height: '40px',
                  marginRight: '16px',
                }}
                onError={() => {
                  console.error('Erro ao carregar logo:', e);
                  setLogoError(true);
                }}
              />
            )}
            <Typography variant="h6" noWrap component="div">
              UPBase
            </Typography>
          </Box>
          <IconButton color="inherit" onClick={toggleTheme}>
            {isDarkMode ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
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
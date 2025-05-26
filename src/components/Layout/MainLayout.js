import React, { useState } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
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
  useMediaQuery,
  useTheme,
} from '@mui/material';
import {
  Menu as MenuIcon,
  LightMode,
  DarkMode,
  NotificationsOutlined,
  AccountCircleOutlined,
  ExpandMore,
  ExpandLess,
  Dashboard,
  Assessment,
  Group,
  Event,
  HealthAndSafety,
  Warning,
  Feedback,
  HelpOutline,
} from '@mui/icons-material';
import { useTheme as useThemeContext } from '../../contexts/ThemeContext';
import { useHelp } from '../../contexts/HelpContext';
import { useLocation } from 'react-router-dom';
import Logo from '../../assets/images/logo-official.png';
import UserMenu from './UserMenu';
import HelpDialog from '../common/HelpDialog';
import { helpContent } from '../../utils/helpContent';

const DRAWER_WIDTH = 240;

const menuItems = [
  { text: 'Dashboard', icon: <Dashboard />, path: '/' },
  {
    text: 'Avaliações',
    icon: <Assessment />,
    subItems: [
      { text: 'Desempenho', path: '/avaliacoes/desempenho' },
      { text: 'Experiência', path: '/avaliacoes/experiencia' },
    ],
  },
  { text: 'Colaboradores', icon: <Group />, path: '/colaboradores' },
  { text: 'Escalas', icon: <Event />, path: '/escalas' },
  { text: 'Atestados', icon: <HealthAndSafety />, path: '/atestados' },
  { text: 'Apontamentos', icon: <Warning />, path: '/apontamentos' },
  { text: 'Feedbacks', icon: <Feedback />, path: '/feedbacks' },
];

function MainLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [logoError, setLogoError] = useState(false); // Adicionando o state para o logo
  const [expandedMenu, setExpandedMenu] = useState('');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();
  const { isDarkMode, toggleTheme } = useThemeContext();
  const { showHelp } = useHelp();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleMenuClick = (item) => {
    if (item.subItems) {
      setExpandedMenu(expandedMenu === item.text ? '' : item.text);
    } else {
      navigate(item.path);
      if (isMobile) handleDrawerToggle();
    }
  };

  const handleLogoClick = () => {
    navigate('/');
  };

  const location = useLocation();

  const handleHelpClick = () => {
    const pathHelp = helpContent[location.pathname];
    if (pathHelp) {
      showHelp('Ajuda', pathHelp);
    } else {
      // Fallback para páginas sem conteúdo específico
      showHelp('Ajuda', helpContent['/']);
    }
  };

  const drawer = (
    <div>
      {/* Toolbar apenas aparece em mobile */}
      {isMobile && <Toolbar />}
      <List>
        {menuItems.map((item) => (
          <React.Fragment key={item.text}>
            <ListItem
              button
              onClick={() => handleMenuClick(item)}
              sx={{
                bgcolor:
                  expandedMenu === item.text
                    ? 'rgba(255, 255, 255, 0.08)'
                    : 'transparent',
              }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
              {item.subItems && (
                expandedMenu === item.text ? <ExpandLess /> : <ExpandMore />
              )}
            </ListItem>
            {item.subItems && (
              <List
                component="div"
                disablePadding
                sx={{
                  display: expandedMenu === item.text ? 'block' : 'none',
                  transition: 'all 0.3s ease',
                }}
              >
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
              <Box
                component="img"
                src={Logo}
                alt="UPBase Logo"
                onClick={handleLogoClick}
                sx={{
                  height: { xs: '55px', sm: '75px' },
                  transition: 'transform 0.2s',
                  cursor: 'pointer',
                  '&:hover': {
                    transform: 'scale(1.05)',
                  }
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
            <UserMenu />
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
        <Outlet /> {/* Substituir {children} por <Outlet /> */}
      </Box>

      <IconButton
        onClick={handleHelpClick}
        sx={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          zIndex: 1200,
          backgroundColor: theme.palette.background.paper,
          color: theme.palette.mode === 'light' ? '#0F2747' : '#FFFFFF',
          boxShadow: theme.shadows[3],
          '&:hover': {
            backgroundColor: theme.palette.mode === 'light'
              ? 'rgba(15, 39, 71, 0.08)'
              : 'rgba(255, 255, 255, 0.08)',
            transform: 'scale(1.1)'
          },
          transition: 'all 0.2s'
        }}
      >
        <HelpOutline />
      </IconButton>

      <HelpDialog />
    </Box>
  );
}

export default MainLayout;
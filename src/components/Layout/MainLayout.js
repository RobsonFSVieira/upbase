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
  Typography,
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
import BottomNav from '../Navigation/BottomNav';

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
  const location = useLocation();

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

  const handleHelpClick = () => {
    const pathHelp = helpContent[location.pathname];
    if (pathHelp) {
      showHelp('Ajuda', pathHelp);
    } else {
      // Fallback para páginas sem conteúdo específico
      showHelp('Ajuda', helpContent['/']);
    }
  };

  const getPageTitle = () => {
    const path = location.pathname;
    if (path === '/') return 'Dashboard';
    if (path.includes('/avaliacoes')) return 'Avaliações';
    if (path.includes('/profile')) return 'Meu Perfil';
    // Adicione mais casos conforme necessário
    return 'UPBase';
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
                    ? 'rgba(255, 255, 255, 0.12)'
                    : 'transparent',
                '&:hover': {
                  bgcolor: 'rgba(255, 255, 255, 0.08)'
                }
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
          backgroundColor: theme.palette.mode === 'light'
            ? 'rgba(255, 255, 255, 0.95)'
            : 'rgba(15, 39, 71, 0.95)',
          borderBottom: theme.palette.mode === 'light'
            ? '1px solid rgba(231, 235, 240, 0.8)'
            : '1px solid rgba(255, 255, 255, 0.05)',
        }}
      >
        <Toolbar
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 2,
            minHeight: { xs: '56px', sm: '70px' },
            px: { xs: 2, sm: 3 },
          }}
        >
          {/* Logo e título para mobile */}
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            flex: 1
          }}>
            {!logoError && (
              <Box
                component="img"
                src={Logo}
                alt="UPBase Logo"
                onClick={handleLogoClick}
                sx={{
                  height: { xs: '32px', sm: '75px' },
                  display: { xs: 'none', sm: 'block' },
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

            {/* Título da página atual no mobile */}
            <Typography
              variant="h6"
              sx={{
                display: { xs: 'block', sm: 'none' },
                fontSize: '1.125rem',
                fontWeight: 600
              }}
            >
              {getPageTitle()}
            </Typography>
          </Box>

          {/* Ações da AppBar */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: { xs: 1, sm: 2 },
            }}
          >
            <UserMenu />

            {/* Botão de tema apenas em telas maiores */}
            <IconButton
              onClick={toggleTheme}
              sx={{
                display: { xs: 'none', sm: 'flex' },
                color: theme.palette.mode === 'light' ? '#0F2747' : '#FFFFFF',
                '&:hover': {
                  backgroundColor: theme.palette.mode === 'light'
                    ? 'rgba(15, 39, 71, 0.08)'
                    : 'rgba(255, 255, 255, 0.08)',
                },
              }}
            >
              {isDarkMode ? <LightMode /> : <DarkMode />}
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      <Box
        component="nav"
        sx={{
          width: { sm: DRAWER_WIDTH },
          flexShrink: { sm: 0 },
          display: { xs: 'none', sm: 'block' }, // Oculta em mobile
        }}
      >
        <Drawer
          variant="permanent"
          open
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
          mb: { xs: '56px', sm: 0 }, // Adiciona margem inferior para o BottomNav no mobile
        }}
      >
        <Outlet /> {/* Substituir {children} por <Outlet /> */}
      </Box>

      <IconButton
        onClick={handleHelpClick}
        sx={{
          position: 'fixed',
          bottom: { xs: 80, sm: 24 }, // Ajusta posição do botão de ajuda para ficar acima do BottomNav
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
          transition: 'all 0.2s',
          display: { xs: 'none', sm: 'flex' } // Oculta o botão de ajuda no mobile
        }}
      >
        <HelpOutline />
      </IconButton>

      <HelpDialog />
      <BottomNav />
    </Box>
  );
}

export default MainLayout;
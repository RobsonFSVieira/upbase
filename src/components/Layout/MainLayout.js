import React, { useState } from 'react';
import { useNavigate, Outlet, useLocation } from 'react-router-dom';
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
  Collapse,
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
import Logo from '../../assets/images/logo-official.png';
import UserMenu from './UserMenu';
import HelpDialog from '../common/HelpDialog';
import { helpContent } from '../../utils/helpContent';
import BottomNav from '../Navigation/BottomNav';

const DRAWER_WIDTH = 240;

const menuItems = [
  { id: 'dashboard', text: 'Dashboard', icon: <Dashboard />, path: '/' },
  {
    id: 'avaliacoes',
    text: 'Avaliações',
    icon: <Assessment />,
    path: '/avaliacoes',
    subItems: [
      { id: 'desempenho', text: 'Desempenho', path: '/avaliacoes/desempenho', icon: <Assessment /> },
      { id: 'experiencia', text: 'Experiência', path: '/avaliacoes/experiencia', icon: <Assessment /> },
    ],
  },
  { id: 'colaboradores', text: 'Colaboradores', icon: <Group />, path: '/colaboradores' },
  { id: 'escalas', text: 'Escalas', icon: <Event />, path: '/escalas' },
  { id: 'atestados', text: 'Atestados', icon: <HealthAndSafety />, path: '/atestados' },
  { id: 'apontamentos', text: 'Apontamentos', icon: <Warning />, path: '/apontamentos' },
  { id: 'feedbacks', text: 'Feedbacks', icon: <Feedback />, path: '/feedbacks' },
];

function MainLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [logoError, setLogoError] = useState(false); // Adicionando o state para o logo
  const [expandedMenus, setExpandedMenus] = useState(() => {
    return menuItems.reduce((acc, item) => {
      if (item.subItems) {
        acc[item.id] = true;
      }
      return acc;
    }, {});
  });
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();
  const { isDarkMode, toggleTheme } = useThemeContext();
  const { showHelp } = useHelp();
  const location = useLocation();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const isActive = (path, itemId) => {
    if (!path) return false;
    // Caso especial para dashboard
    if (path === '/') {
      return location.pathname === '/';
    }
    // Para itens com subitens, verifica se algum subitem está ativo
    const menuItem = menuItems.find(item => item.id === itemId);
    if (menuItem?.subItems) {
      return menuItem.subItems.some(subItem => location.pathname.startsWith(subItem.path));
    }
    // Para outros itens e subitens
    return location.pathname === path;
  };

  const handleMenuClick = (item) => {
    if (!item.subItems) {
      navigate(item.path);
    }
    // Sempre alterna o estado do menu para o item clicado
    setExpandedMenus(prev => ({
      ...prev,
      [item.id]: !prev[item.id]
    }));
    if (isMobile) {
      handleDrawerToggle();
    }
  };

  const handleSubItemClick = (path) => {
    navigate(path);
    if (isMobile) {
      handleDrawerToggle();
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

  // No drawer, altere o renderização dos itens:
  const drawer = (
    <div>
      {/* Toolbar apenas aparece em mobile */}
      {isMobile && <Toolbar />}
      <List>
        {menuItems.map((item) => (
          <React.Fragment key={item.id}>
            <ListItem
              button
              onClick={() => handleMenuClick(item)}
              sx={{
                bgcolor: isActive(item.path, item.id) ? 'rgba(25, 118, 210, 0.12)' : 'transparent',
                borderLeft: isActive(item.path, item.id) ? '4px solid #1976d2' : '4px solid transparent',
                '&:hover': {
                  bgcolor: 'rgba(25, 118, 210, 0.08)',
                }
              }}
            >
              <ListItemIcon
                sx={{
                  color: isActive(item.path, item.id) ? '#1976d2' : 'inherit',
                  minWidth: '40px'
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.text}
                sx={{
                  color: isActive(item.path, item.id) ? '#1976d2' : 'inherit',
                  '& .MuiTypography-root': {
                    fontWeight: isActive(item.path, item.id) ? 600 : 400
                  }
                }}
              />
              {item.subItems && (
                expandedMenus[item.id] ? <ExpandLess /> : <ExpandMore />
              )}
            </ListItem>

            {item.subItems && (
              <Collapse in={expandedMenus[item.id]} timeout="auto">
                <List component="div" disablePadding>
                  {item.subItems.map((subItem) => (
                    <ListItem
                      button
                      key={subItem.id}
                      onClick={() => navigate(subItem.path)}
                      sx={{
                        pl: 4,
                        bgcolor: isActive(subItem.path) ? 'rgba(25, 118, 210, 0.12)' : 'transparent',
                        borderLeft: isActive(subItem.path) ? '4px solid #1976d2' : '4px solid transparent',
                        '&:hover': {
                          bgcolor: 'rgba(25, 118, 210, 0.08)',
                        }
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          color: isActive(subItem.path) ? '#1976d2' : 'inherit',
                          minWidth: '40px'
                        }}
                      >
                        {subItem.icon}
                      </ListItemIcon>
                      <ListItemText
                        primary={subItem.text}
                        sx={{
                          color: isActive(subItem.path) ? '#1976d2' : 'inherit',
                          '& .MuiTypography-root': {
                            fontWeight: isActive(subItem.path) ? 600 : 400
                          }
                        }}
                      />
                    </ListItem>
                  ))}
                </List>
              </Collapse>
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
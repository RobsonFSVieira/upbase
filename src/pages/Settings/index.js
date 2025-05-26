import React from 'react';
import {
  Box,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Switch,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import { useTheme } from '../../contexts/ThemeContext';

const Settings = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const [settings, setSettings] = React.useState({
    notifications: true,
    emailNotifications: true,
    language: 'pt-BR'
  });

  const handleChange = (setting) => (event) => {
    if (setting === 'darkMode') {
      toggleTheme();
    } else {
      setSettings(prev => ({
        ...prev,
        [setting]: event.target.type === 'checkbox' ? event.target.checked : event.target.value
      }));
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          Configurações
        </Typography>

        <List>
          <ListItem>
            <ListItemText 
              primary="Modo Escuro" 
              secondary="Alternar entre tema claro e escuro"
            />
            <ListItemSecondaryAction>
              <Switch
                edge="end"
                checked={isDarkMode}
                onChange={() => toggleTheme()}
              />
            </ListItemSecondaryAction>
          </ListItem>

          <Divider />

          <ListItem>
            <ListItemText 
              primary="Notificações no Sistema" 
              secondary="Receber notificações dentro do sistema"
            />
            <ListItemSecondaryAction>
              <Switch
                edge="end"
                checked={settings.notifications}
                onChange={handleChange('notifications')}
              />
            </ListItemSecondaryAction>
          </ListItem>

          <Divider />

          <ListItem>
            <ListItemText 
              primary="Notificações por Email" 
              secondary="Receber cópia das notificações por email"
            />
            <ListItemSecondaryAction>
              <Switch
                edge="end"
                checked={settings.emailNotifications}
                onChange={handleChange('emailNotifications')}
              />
            </ListItemSecondaryAction>
          </ListItem>

          <Divider />

          <ListItem>
            <FormControl fullWidth>
              <InputLabel>Idioma</InputLabel>
              <Select
                value={settings.language}
                onChange={handleChange('language')}
                label="Idioma"
              >
                <MenuItem value="pt-BR">Português (Brasil)</MenuItem>
                <MenuItem value="en">English</MenuItem>
              </Select>
            </FormControl>
          </ListItem>
        </List>
      </Paper>
    </Box>
  );
};

export default Settings;

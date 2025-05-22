import React from 'react';
import {
  Box,
  Paper,
  Typography,
  Avatar,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  ListItemIcon
} from '@mui/material';
import {
  Person,
  Work,
  Schedule,
  Group,
  Badge
} from '@mui/icons-material';
import { useUser } from '../../contexts/UserContext';

const Profile = () => {
  const { userProfile } = useUser();

  return (
    <Box sx={{ p: 3 }}>
      <Paper sx={{ p: 3 }}>
        <Box display="flex" alignItems="center" mb={3}>
          <Avatar
            sx={{ 
              width: 80, 
              height: 80, 
              mr: 2,
              bgcolor: 'primary.main'
            }}
          >
            {userProfile?.name?.[0] || 'U'}
          </Avatar>
          <Box>
            <Typography variant="h5" gutterBottom>
              {userProfile?.name || 'Usuário'}
            </Typography>
            <Typography color="textSecondary">
              {userProfile?.role === 'lider' ? 'Líder' : 'Colaborador'}
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <List>
              <ListItem>
                <ListItemIcon>
                  <Person />
                </ListItemIcon>
                <ListItemText 
                  primary="ID" 
                  secondary={userProfile?.id || 'N/A'} 
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <Badge />
                </ListItemIcon>
                <ListItemText 
                  primary="Matrícula" 
                  secondary={userProfile?.matricula || 'N/A'} 
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <Work />
                </ListItemIcon>
                <ListItemText 
                  primary="Cargo" 
                  secondary={userProfile?.cargo || 'N/A'} 
                />
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={12} md={6}>
            <List>
              <ListItem>
                <ListItemIcon>
                  <Schedule />
                </ListItemIcon>
                <ListItemText 
                  primary="Turno" 
                  secondary={userProfile?.turno || 'N/A'} 
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <Group />
                </ListItemIcon>
                <ListItemText 
                  primary="Equipe" 
                  secondary={userProfile?.equipe || 'N/A'} 
                />
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default Profile;

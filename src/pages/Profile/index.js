import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Tooltip,
  Card,
  CardHeader,
  CardContent,
} from '@mui/material';
import {
  Edit as EditIcon,
  Person as PersonIcon,
  Badge as BadgeIcon,
  Email as EmailIcon,
  Work as WorkIcon,
  Schedule as ScheduleIcon
} from '@mui/icons-material';
import { useUser } from '../../contexts/UserContext';

const Profile = () => {
  const { userProfile } = useUser();
  const [editMode, setEditMode] = useState(false);
  const [pendingChanges, setPendingChanges] = useState(null);
  const [formData, setFormData] = useState({
    nome: userProfile?.nome || '',
    email: userProfile?.email || '',
    turno: userProfile?.turno || '',
    cargo: userProfile?.cargo || '',
    matricula: userProfile?.matricula || ''
  });
  const [confirmDialog, setConfirmDialog] = useState(false);

  const profileFields = [
    {
      icon: <PersonIcon />,
      label: "Nome",
      value: userProfile?.nome,
      field: 'nome',
      editable: true
    },
    {
      icon: <BadgeIcon />,
      label: "Matrícula",
      value: userProfile?.matricula,
      field: 'matricula',
      editable: false
    },
    {
      icon: <EmailIcon />,
      label: "E-mail",
      value: userProfile?.email,
      field: 'email',
      editable: false
    },
    {
      icon: <WorkIcon />,
      label: "Cargo",
      value: userProfile?.cargo,
      field: 'cargo',
      editable: true
    },
    {
      icon: <ScheduleIcon />,
      label: "Turno",
      value: userProfile?.turno,
      field: 'turno',
      editable: true
    }
  ];

  const handleSubmitChanges = () => {
    const changes = Object.entries(formData).reduce((acc, [key, value]) => {
      if (value !== userProfile[key]) {
        acc[key] = value;
      }
      return acc;
    }, {});

    if (Object.keys(changes).length > 0) {
      setPendingChanges(changes);
      setConfirmDialog(true);
    }
  };

  const handleConfirmRequest = () => {
    // Aqui enviaria a solicitação para o backend
    console.log('Solicitação de alteração:', pendingChanges);
    setConfirmDialog(false);
    setEditMode(false);
    // Exibir mensagem de sucesso
    alert('Solicitação enviada para aprovação do líder');
  };

  return (
    <Box sx={{ p: 3 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>Meu Perfil</Typography>

        <Box sx={{ mt: 3 }}>
          {profileFields.map((field) => (
            <Box
              key={field.field}
              sx={{
                display: 'flex',
                alignItems: 'center',
                py: 2,
                borderBottom: '1px solid',
                borderColor: 'divider'
              }}
            >
              <Box sx={{ mr: 2, color: 'primary.main' }}>{field.icon}</Box>
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="caption" color="textSecondary">
                  {field.label}
                </Typography>
                <Typography>{field.value || '-'}</Typography>
              </Box>
              {field.editable && (
                <Tooltip title="Solicitar alteração">
                  <IconButton
                    size="small"
                    onClick={() => {
                      setEditMode(true);
                      setPendingChanges({ [field.field]: field.value });
                    }}
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              )}
            </Box>
          ))}
        </Box>
      </Paper>

      {/* Seção de Solicitações Pendentes mais discreta */}
      <Box sx={{ mt: 4 }}>
        <Typography 
          variant="subtitle2" 
          color="text.secondary"
          sx={{ 
            mb: 1,
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            fontSize: '0.875rem'
          }}
        >
          Solicitações Pendentes
        </Typography>
        <Box sx={{ 
          p: 2, 
          bgcolor: 'grey.50', 
          borderRadius: 1,
          border: '1px solid',
          borderColor: 'divider'
        }}>
          <Typography 
            variant="body2" 
            color="text.secondary"
            align="center"
          >
            Nenhuma solicitação pendente
          </Typography>
        </Box>
      </Box>

      <Dialog open={confirmDialog} onClose={() => setConfirmDialog(false)}>
        <DialogTitle>Confirmar Solicitação de Alteração</DialogTitle>
        <DialogContent>
          <Typography paragraph>
            Você está solicitando as seguintes alterações:
          </Typography>
          <List>
            {pendingChanges && Object.entries(pendingChanges).map(([field, value]) => (
              <ListItem key={field}>
                <ListItemText
                  primary={field.charAt(0).toUpperCase() + field.slice(1)}
                  secondary={`De: ${userProfile[field]} | Para: ${value}`}
                />
              </ListItem>
            ))}
          </List>
          <Typography>
            Estas alterações precisarão ser aprovadas pelo seu líder.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDialog(false)}>Cancelar</Button>
          <Button onClick={handleConfirmRequest} variant="contained">
            Confirmar Solicitação
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Profile;

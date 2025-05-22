import React, { useState } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from '@mui/material';
import {
  Check as ActivateIcon,
  Undo as RevertIcon,
  Delete as DeleteIcon,
  FileCopy as CopyIcon
} from '@mui/icons-material';
import { useForms } from '../../../../contexts/FormsContext';
import HelpButton from '../../../../components/common/HelpButton';

const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('pt-BR', {
    timeZone: 'UTC'
  });
};

const GerenciamentoAvaliacoes = () => {
  const { forms, updateFormStatus, cloneForm, setForms } = useForms();
  const [confirmDialog, setConfirmDialog] = useState({
    open: false,
    title: '',
    message: '',
    action: null,
    data: null
  });

  const handleConfirmAction = () => {
    if (confirmDialog.action && confirmDialog.data) {
      confirmDialog.action(confirmDialog.data);
    }
    setConfirmDialog(prev => ({ ...prev, open: false }));
  };

  const showConfirmDialog = (title, message, action, data) => {
    setConfirmDialog({
      open: true,
      title,
      message,
      action,
      data
    });
  };

  const handleActivateClick = (modelId) => {
    showConfirmDialog(
      'Ativar Modelo',
      'Tem certeza que deseja ativar este modelo? Ele será usado nas próximas avaliações.',
      (id) => updateFormStatus(id, 'approved', 'active'),
      modelId
    );
  };

  const handleCloneClick = (modelId) => {
    showConfirmDialog(
      'Clonar Modelo',
      'Deseja criar uma cópia deste modelo? Ela aparecerá em Modelos de Formulário como rascunho.',
      (id) => cloneForm(id, 'approved'),
      modelId
    );
  };

  const handleRevertClick = (modelId) => {
    showConfirmDialog(
      'Retornar Modelo',
      'Tem certeza que deseja retornar este modelo para Modelos de Formulário? Ele não estará mais disponível em Gerenciamento.',
      (id) => updateFormStatus(id, 'approved', 'drafts'),
      modelId
    );
  };

  const handleDeleteClick = (modelId) => {
    showConfirmDialog(
      'Excluir Modelo',
      'Tem certeza que deseja excluir este modelo? Esta ação não pode ser desfeita.',
      (id) => {
        setForms(prev => ({
          ...prev,
          approved: prev.approved.filter(form => form.id !== id)
        }));
      },
      modelId
    );
  };

  const helpContent = (
    <>
      <Typography variant="h6" gutterBottom>Gerenciamento de Avaliações</Typography>
      <Typography paragraph>
        Esta página permite gerenciar as avaliações aprovadas e ativas.
      </Typography>
      <Typography variant="subtitle1" gutterBottom>Ações disponíveis:</Typography>
      <ul>
        <li>Ativar modelos aprovados para uso</li>
        <li>Retornar modelos para edição</li>
        <li>Visualizar período de validade</li>
        <li>Gerenciar critérios e pesos</li>
      </ul>
    </>
  );

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Box display="flex" alignItems="center" gap={1}>
          <Typography variant="h6">Gerenciamento de Modelos</Typography>
          <HelpButton 
            title="Ajuda - Gerenciamento"
            content={helpContent}
          />
        </Box>
      </Box>

      <Grid container spacing={3}>
        {forms.approved?.map(model => (
          <Grid item xs={12} md={4} key={model.id}>
            <Card>
              <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="start">
                  <Typography variant="h6">{model.title || 'Sem título'}</Typography>
                  <Chip
                    label={model.status === 'approved' ? 'Aprovado' : 'Ativo'}
                    color={model.status === 'approved' ? 'success' : 'primary'}
                    size="small"
                  />
                </Box>
                <Typography color="textSecondary" paragraph>
                  {model.description || 'Sem descrição'}
                </Typography>
                <Typography variant="caption" color="textSecondary" display="block">
                  Seções: {model.sections?.length || 0}
                </Typography>
                {model.validFrom && model.validUntil && (
                  <Typography variant="caption" color="textSecondary" display="block">
                    Período: {formatDate(model.validFrom)} - {formatDate(model.validUntil)}
                  </Typography>
                )}
                <Box display="flex" justifyContent="flex-end" gap={1}>
                  {model.status === 'approved' && (
                    <Tooltip title="Ativar Modelo">
                      <IconButton
                        color="success"
                        onClick={() => handleActivateClick(model.id)}
                        size="small"
                      >
                        <ActivateIcon />
                      </IconButton>
                    </Tooltip>
                  )}
                  <Tooltip title="Clonar Modelo">
                    <IconButton
                      color="primary"
                      onClick={() => handleCloneClick(model.id)}
                      size="small"
                    >
                      <CopyIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Retornar para Modelos">
                    <IconButton
                      color="warning"
                      onClick={() => handleRevertClick(model.id)}
                      size="small"
                    >
                      <RevertIcon />
                    </IconButton>
                  </Tooltip>
                  <IconButton
                    color="error"
                    onClick={() => handleDeleteClick(model.id)}
                    size="small"
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog
        open={confirmDialog.open}
        onClose={() => setConfirmDialog(prev => ({ ...prev, open: false }))}
      >
        <DialogTitle>{confirmDialog.title}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {confirmDialog.message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={() => setConfirmDialog(prev => ({ ...prev, open: false }))}
          >
            Cancelar
          </Button>
          <Button 
            variant="contained" 
            onClick={handleConfirmAction}
            color={confirmDialog.title.includes('Excluir') ? 'error' : 'primary'}
          >
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default GerenciamentoAvaliacoes;

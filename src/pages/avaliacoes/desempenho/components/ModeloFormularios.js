import React, { useState } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
  IconButton,
  Tooltip,
  DialogContentText
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Check as ApproveIcon,
  Undo as UndoIcon,
  FileCopy as CopyIcon
} from '@mui/icons-material';
import FormBuilder from '../../../../components/FormBuilder/FormBuilder';
import { useUser } from '../../../../contexts/UserContext';
import { useForms } from '../../../../contexts/FormsContext';
import HelpButton from '../../../../components/common/HelpButton';

const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('pt-BR', {
    timeZone: 'UTC'  // Importante: usar UTC para evitar problemas de timezone
  });
};

const ModeloFormularios = () => {
  const { userProfile } = useUser();
  const { forms, setForms, moveForm, cloneForm } = useForms();
  const [openBuilder, setOpenBuilder] = useState(false);
  const [selectedModel, setSelectedModel] = useState(null);
  const [confirmDialog, setConfirmDialog] = useState({
    open: false,
    title: '',
    message: '',
    action: null,
    data: null
  });
  const formBuilderRef = React.useRef(null);

  const handleApprove = (modelId) => {
    try {
      moveForm(modelId, 'drafts', 'approved');
    } catch (error) {
      console.error('Erro ao aprovar modelo:', error);
    }
  };

  const handleRevert = async (modelId) => {
    try {
      moveForm(modelId, 'approved', 'drafts');
      // Registrar quem fez o estorno e quando
      setForms(prev => ({
        ...prev,
        drafts: prev.drafts.map(form => 
          form.id === modelId 
            ? { 
                ...form, 
                revertedAt: new Date(),
                revertedBy: userProfile.id 
              }
            : form
        )
      }));
    } catch (error) {
      console.error('Erro ao reverter modelo:', error);
    }
  };

  const handleSave = (formData) => {
    try {
      const modelData = {
        ...formData,
        id: selectedModel?.id || Date.now(),
        status: 'draft',
        updatedAt: new Date(),
      };

      setForms(prev => ({
        ...prev,
        drafts: selectedModel
          ? prev.drafts.map(form => 
              form.id === selectedModel.id ? modelData : form
            )
          : [...prev.drafts, modelData]
      }));

      setOpenBuilder(false);
      setSelectedModel(null);
    } catch (error) {
      console.error('Erro ao salvar modelo:', error);
    }
  };

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

  const handleApproveClick = (modelId) => {
    showConfirmDialog(
      'Aprovar Modelo',
      'Tem certeza que deseja aprovar este modelo? Após aprovado, o modelo estará disponível em Gerenciamento.',
      handleApprove,
      modelId
    );
  };

  const handleRevertClick = (modelId) => {
    showConfirmDialog(
      'Retornar Modelo',
      'Tem certeza que deseja retornar este modelo para rascunho? Ele não estará mais disponível em Gerenciamento até ser aprovado novamente.',
      handleRevert,
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
          drafts: prev.drafts.filter(form => form.id !== id)
        }));
      },
      modelId
    );
  };

  const handleCloneClick = (modelId) => {
    showConfirmDialog(
      'Clonar Modelo',
      'Deseja criar uma cópia deste modelo? Ela aparecerá como um novo rascunho.',
      (id) => cloneForm(id, 'drafts'),
      modelId
    );
  };

  const helpContent = (
    <>
      <Typography variant="h6" gutterBottom>Como usar Modelos de Formulários</Typography>
      <Typography paragraph>
        Esta página permite criar e gerenciar modelos de formulários de avaliação.
      </Typography>
      <Typography variant="subtitle1" gutterBottom>Funcionalidades principais:</Typography>
      <ul>
        <li>Criar novo modelo de avaliação</li>
        <li>Editar modelos existentes</li>
        <li>Aprovar modelos para uso</li>
        <li>Reverter modelos para rascunho</li>
      </ul>
      <Typography variant="subtitle1" gutterBottom>Status dos modelos:</Typography>
      <ul>
        <li>Rascunho: Em edição, não disponível para uso</li>
        <li>Aprovado: Disponível para uso em avaliações</li>
        <li>Ativo: Em uso em avaliações atuais</li>
      </ul>
    </>
  );

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Box display="flex" alignItems="center" gap={1}>
          <Typography variant="h6">Modelos de Formulário</Typography>
          <HelpButton 
            title="Ajuda - Modelos de Formulário"
            content={helpContent}
          />
        </Box>
        <Button
          startIcon={<AddIcon />}
          variant="contained"
          onClick={() => setOpenBuilder(true)}
        >
          Criar Modelo
        </Button>
      </Box>

      <Grid container spacing={3}>
        {forms.drafts?.map(model => (
          <Grid item xs={12} md={4} key={model.id}>
            <Card>
              <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="start">
                  <Typography variant="h6">{model.title || 'Sem título'}</Typography>
                  <Chip
                    label={model.status === 'draft' ? 'Rascunho' : 
                           model.status === 'approved' ? 'Aprovado' : 'Ativo'}
                    color={model.status === 'draft' ? 'default' : 
                           model.status === 'approved' ? 'success' : 'primary'}
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
                  {model.status === 'draft' && (
                    <IconButton
                      color="success"
                      onClick={() => handleApproveClick(model.id)}
                      size="small"
                    >
                      <ApproveIcon />
                    </IconButton>
                  )}
                  {model.status === 'approved' && (
                    <Tooltip title="Retornar para rascunho">
                      <IconButton
                        color="warning"
                        onClick={() => handleRevertClick(model.id)}
                        size="small"
                      >
                        <UndoIcon />
                      </IconButton>
                    </Tooltip>
                  )}
                  <IconButton
                    color="primary"
                    onClick={() => {
                      setSelectedModel(model);
                      setOpenBuilder(true);
                    }}
                    size="small"
                  >
                    <EditIcon />
                  </IconButton>
                  <Tooltip title="Clonar Modelo">
                    <IconButton
                      color="primary"
                      onClick={() => handleCloneClick(model.id)}
                      size="small"
                    >
                      <CopyIcon />
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
        open={openBuilder}
        onClose={() => {
          setOpenBuilder(false);
          setSelectedModel(null);
        }}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          {selectedModel ? 'Editar Modelo' : 'Novo Modelo'}
        </DialogTitle>
        <DialogContent>
          <FormBuilder
            ref={formBuilderRef}
            initialData={selectedModel}
            onSave={handleSave}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenBuilder(false)}>
            Cancelar
          </Button>
          <Button 
            variant="contained"
            onClick={() => {
              if (formBuilderRef.current) {
                formBuilderRef.current.handleSubmit();
              }
            }}
          >
            Salvar
          </Button>
        </DialogActions>
      </Dialog>

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

export default ModeloFormularios;

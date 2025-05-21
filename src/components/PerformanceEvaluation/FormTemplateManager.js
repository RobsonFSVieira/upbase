import React, { useState, useEffect } from 'react';
import {
  Box, 
  Typography, 
  Card, 
  CardContent, 
  Button, 
  TextField,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  CircularProgress,
  Alert
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon
} from '@mui/icons-material';

import { TIPOS_AVALIACAO } from '../../utils/constants/avaliacoes';

const mockCriterios = [
  { id: 1, nome: 'Qualidade do Trabalho', tipo: 'quantitativo_escala', peso: 1.0 },
  { id: 2, nome: 'Comunicação', tipo: 'quantitativo_escala', peso: 0.8 },
  { id: 3, nome: 'Trabalho em Equipe', tipo: 'quantitativo_escala', peso: 1.0 },
];

const mockModelos = [
  {
    id: 1,
    nome: 'Avaliação Trimestral Padrão',
    tipo: 'desempenho',
    subtipo: TIPOS_AVALIACAO.DESEMPENHO.TRIMESTRAL,
    descricao: 'Modelo padrão para avaliação trimestral',
    criterios: [1, 2, 3]
  },
  {
    id: 2,
    nome: 'Avaliação Anual',
    tipo: 'desempenho',
    subtipo: TIPOS_AVALIACAO.DESEMPENHO.ANUAL,
    descricao: 'Modelo completo para avaliação anual',
    criterios: [1, 2, 3]
  }
];

const FormTemplateManager = () => {
  const [loading, setLoading] = useState(false);
  const [modelos, setModelos] = useState([]);
  const [criterios, setCriterios] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentModelo, setCurrentModelo] = useState(null);
  
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        // Em um cenário real, estes dados viriam de uma API
        setCriterios(mockCriterios);
        setModelos(mockModelos);
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, []);
  
  const handleOpenDialog = (modelo = null) => {
    setCurrentModelo(modelo || { 
      nome: '', 
      tipo: 'desempenho', 
      subtipo: '', 
      descricao: '', 
      criterios: [] 
    });
    setDialogOpen(true);
  };
  
  const handleCloseDialog = () => {
    setDialogOpen(false);
    setCurrentModelo(null);
  };
  
  const handleSaveModelo = () => {
    // Em um cenário real, salvaríamos no banco de dados
    if (currentModelo.id) {
      // Atualizar modelo existente
      setModelos(modelos.map(m => 
        m.id === currentModelo.id ? currentModelo : m
      ));
    } else {
      // Criar novo modelo
      const newModelo = {
        ...currentModelo,
        id: Math.max(0, ...modelos.map(m => m.id)) + 1
      };
      setModelos([...modelos, newModelo]);
    }
    
    handleCloseDialog();
  };
  
  const handleDeleteModelo = (id) => {
    // Em um cenário real, excluiríamos do banco de dados
    setModelos(modelos.filter(m => m.id !== id));
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentModelo(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleChangeCriterios = (e) => {
    const { value } = e.target;
    setCurrentModelo(prev => ({
      ...prev,
      criterios: value
    }));
  };
  
  if (loading) {
    return (
      <Box display="flex" justifyContent="center" p={3}>
        <CircularProgress />
      </Box>
    );
  }
  
  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6">Modelos de Avaliação</Typography>
        <Button 
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
        >
          Novo Modelo
        </Button>
      </Box>
      
      {modelos.length === 0 ? (
        <Alert severity="info">
          Nenhum modelo de avaliação encontrado. Crie um novo modelo para começar.
        </Alert>
      ) : (
        <Grid container spacing={2}>
          {modelos.map(modelo => (
            <Grid item xs={12} md={6} key={modelo.id}>
              <Card variant="outlined">
                <CardContent>
                  <Box display="flex" justifyContent="space-between" alignItems="flex-start">
                    <Typography variant="h6">{modelo.nome}</Typography>
                    <Box>
                      <IconButton 
                        size="small" 
                        onClick={() => handleOpenDialog(modelo)}
                        color="primary"
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton 
                        size="small" 
                        onClick={() => handleDeleteModelo(modelo.id)}
                        color="error"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </Box>
                  
                  <Typography variant="subtitle2" color="textSecondary">
                    {modelo.subtipo || modelo.tipo}
                  </Typography>
                  
                  <Typography variant="body2" paragraph>
                    {modelo.descricao}
                  </Typography>
                  
                  <Divider sx={{ my: 1 }} />
                  
                  <Typography variant="subtitle2">
                    Critérios: {modelo.criterios.length}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
      
      <Dialog open={dialogOpen} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>
          {currentModelo?.id ? 'Editar Modelo' : 'Novo Modelo'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Nome do Modelo"
                name="nome"
                value={currentModelo?.nome || ''}
                onChange={handleChange}
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Tipo</InputLabel>
                <Select
                  name="tipo"
                  value={currentModelo?.tipo || 'desempenho'}
                  onChange={handleChange}
                  label="Tipo"
                >
                  <MenuItem value="desempenho">Avaliação de Desempenho</MenuItem>
                  <MenuItem value="experiencia">Avaliação de Experiência</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Subtipo</InputLabel>
                <Select
                  name="subtipo"
                  value={currentModelo?.subtipo || ''}
                  onChange={handleChange}
                  label="Subtipo"
                >
                  {currentModelo?.tipo === 'desempenho' ? (
                    <>
                      <MenuItem value={TIPOS_AVALIACAO.DESEMPENHO.TRIMESTRAL}>Trimestral</MenuItem>
                      <MenuItem value={TIPOS_AVALIACAO.DESEMPENHO.SEMESTRAL}>Semestral</MenuItem>
                      <MenuItem value={TIPOS_AVALIACAO.DESEMPENHO.ANUAL}>Anual</MenuItem>
                    </>
                  ) : (
                    <>
                      <MenuItem value={TIPOS_AVALIACAO.EXPERIENCIA.PERIODO_TESTE}>Período de Teste</MenuItem>
                      <MenuItem value={TIPOS_AVALIACAO.EXPERIENCIA.FINAL_CONTRATO}>Final de Contrato</MenuItem>
                    </>
                  )}
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={2}
                label="Descrição"
                name="descricao"
                value={currentModelo?.descricao || ''}
                onChange={handleChange}
              />
            </Grid>
            
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Critérios de Avaliação</InputLabel>
                <Select
                  multiple
                  name="criterios"
                  value={currentModelo?.criterios || []}
                  onChange={handleChangeCriterios}
                  label="Critérios de Avaliação"
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((criterioId) => {
                        const criterio = criterios.find(c => c.id === criterioId);
                        return criterio ? criterio.nome : '';
                      }).join(', ')}
                    </Box>
                  )}
                >
                  {criterios.map((criterio) => (
                    <MenuItem key={criterio.id} value={criterio.id}>
                      {criterio.nome}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancelar</Button>
          <Button 
            onClick={handleSaveModelo} 
            variant="contained"
            disabled={!currentModelo?.nome || currentModelo?.criterios?.length === 0}
          >
            Salvar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default FormTemplateManager;

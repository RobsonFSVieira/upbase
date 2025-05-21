import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControlLabel,
  Switch,
  Grid,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemSecondaryAction,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  CircularProgress,
  Divider,
  Alert,
  Chip
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  CheckBox as CheckBoxIcon,
  CheckBoxOutlineBlank as CheckBoxOutlineBlankIcon,
  DragIndicator as DragIndicatorIcon,
  Save as SaveIcon,
  Cancel as CancelIcon
} from '@mui/icons-material';
import { performanceService } from '../../../../services/performanceService';

const ModelosAvaliacao = () => {
  const [modelos, setModelos] = useState([]);
  const [criterios, setCriterios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentModelo, setCurrentModelo] = useState(null);
  const [error, setError] = useState(null);
  const [selectedCriteriosLider, setSelectedCriteriosLider] = useState([]);
  const [selectedCriteriosAutoPares, setSelectedCriteriosAutoPares] = useState([]);

  useEffect(() => {
    const carregarDados = async () => {
      try {
        setLoading(true);
        const [modelosData, criteriosData] = await Promise.all([
          performanceService.getModelosAvaliacao(),
          performanceService.getCriterios()
        ]);
        setModelos(modelosData);
        setCriterios(criteriosData);
      } catch (err) {
        setError('Erro ao carregar dados');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    carregarDados();
  }, []);

  const handleOpenDialog = (modelo = null) => {
    if (modelo) {
      setCurrentModelo(modelo);
      setSelectedCriteriosLider(modelo.criterios_lider || []);
      setSelectedCriteriosAutoPares(modelo.criterios_auto_pares || []);
    } else {
      setCurrentModelo({
        nome_modelo: '',
        descricao: '',
        ativo: true,
        criterios_lider: [],
        criterios_auto_pares: []
      });
      setSelectedCriteriosLider([]);
      setSelectedCriteriosAutoPares([]);
    }
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setCurrentModelo(null);
    setSelectedCriteriosLider([]);
    setSelectedCriteriosAutoPares([]);
  };

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    
    if (name === 'ativo') {
      setCurrentModelo(prev => ({
        ...prev,
        [name]: checked
      }));
    } else {
      setCurrentModelo(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleToggleCriterioLider = (criterioId) => {
    if (selectedCriteriosLider.includes(criterioId)) {
      setSelectedCriteriosLider(prev => prev.filter(id => id !== criterioId));
    } else {
      setSelectedCriteriosLider(prev => [...prev, criterioId]);
    }
  };

  const handleToggleCriterioAutoPares = (criterioId) => {
    if (selectedCriteriosAutoPares.includes(criterioId)) {
      setSelectedCriteriosAutoPares(prev => prev.filter(id => id !== criterioId));
    } else {
      setSelectedCriteriosAutoPares(prev => [...prev, criterioId]);
    }
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      const modeloToSave = {
        ...currentModelo,
        criterios_lider: selectedCriteriosLider,
        criterios_auto_pares: selectedCriteriosAutoPares
      };
      
      const resultado = await performanceService.salvarModeloAvaliacao(modeloToSave);
      
      if (currentModelo.id) {
        // Atualizar modelo existente na lista
        setModelos(prev => 
          prev.map(m => m.id === resultado.id ? resultado : m)
        );
      } else {
        // Adicionar novo modelo à lista
        setModelos(prev => [...prev, resultado]);
      }
      
      handleCloseDialog();
    } catch (err) {
      setError('Erro ao salvar modelo');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const criteriosLider = criterios.filter(c => c.origem_preenchimento_padrao === 'lider');
  const criteriosAutoPares = criterios.filter(c => c.origem_preenchimento_padrao === 'ambos');

  if (loading && modelos.length === 0) {
    return (
      <Box display="flex" justifyContent="center" my={4}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5" fontWeight="bold">
          Modelos de Avaliação
        </Typography>
        <Button 
          variant="contained" 
          startIcon={<AddIcon />} 
          onClick={() => handleOpenDialog()}
        >
          Novo Modelo
        </Button>
      </Box>

      {error && (
        <Alert severity="error" onClose={() => setError(null)} sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Card>
        <CardContent>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Nome do Modelo</TableCell>
                  <TableCell>Descrição</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Critérios Líder</TableCell>
                  <TableCell>Critérios Auto/Pares</TableCell>
                  <TableCell align="right">Ações</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {modelos.map((modelo) => (
                  <TableRow key={modelo.id}>
                    <TableCell>{modelo.nome_modelo}</TableCell>
                    <TableCell>{modelo.descricao}</TableCell>
                    <TableCell>
                      <Chip 
                        label={modelo.ativo ? "Ativo" : "Inativo"}
                        color={modelo.ativo ? "success" : "default"}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>{modelo.criterios_lider?.length || 0}</TableCell>
                    <TableCell>{modelo.criterios_auto_pares?.length || 0}</TableCell>
                    <TableCell align="right">
                      <IconButton 
                        size="small" 
                        color="primary" 
                        onClick={() => handleOpenDialog(modelo)}
                        title="Editar"
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* Diálogo para criar/editar modelo de avaliação */}
      <Dialog open={dialogOpen} onClose={handleCloseDialog} maxWidth="lg" fullWidth>
        <DialogTitle>
          {currentModelo?.id ? 'Editar Modelo de Avaliação' : 'Novo Modelo de Avaliação'}
        </DialogTitle>
        <DialogContent dividers>
          <Box component="form" noValidate sx={{ mt: 1 }} display="flex" flexDirection="column" gap={2}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Nome do Modelo"
                  name="nome_modelo"
                  value={currentModelo?.nome_modelo || ''}
                  onChange={handleChange}
                  required
                />
              </Grid>
              
              <Grid item xs={12} md={6}>
                <FormControlLabel
                  control={
                    <Switch 
                      checked={currentModelo?.ativo || false} 
                      onChange={handleChange}
                      name="ativo" 
                    />
                  }
                  label="Modelo Ativo"
                />
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Descrição"
                  name="descricao"
                  value={currentModelo?.descricao || ''}
                  onChange={handleChange}
                  multiline
                  rows={2}
                />
              </Grid>
            </Grid>
            
            <Typography variant="h6" sx={{ mt: 2 }}>Critérios de Avaliação</Typography>
            
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle1" gutterBottom>
                  Critérios para Líderes
                </Typography>
                <Paper variant="outlined" sx={{ maxHeight: 300, overflow: 'auto', p: 1 }}>
                  <List dense>
                    {criteriosLider.map((criterio) => (
                      <ListItem 
                        key={criterio.id}
                        button
                        onClick={() => handleToggleCriterioLider(criterio.id)}
                      >
                        <ListItemIcon>
                          {selectedCriteriosLider.includes(criterio.id) ? (
                            <CheckBoxIcon color="primary" />
                          ) : (
                            <CheckBoxOutlineBlankIcon />
                          )}
                        </ListItemIcon>
                        <ListItemText 
                          primary={criterio.nome_criterio} 
                          secondary={criterio.descricao_criterio}
                        />
                        <ListItemSecondaryAction>
                          <Chip 
                            label={`Peso: ${criterio.peso_padrao}`} 
                            size="small"
                            color="primary"
                            variant="outlined"
                          />
                        </ListItemSecondaryAction>
                      </ListItem>
                    ))}
                  </List>
                </Paper>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle1" gutterBottom>
                  Critérios para Autoavaliação e Avaliação entre Pares
                </Typography>
                <Paper variant="outlined" sx={{ maxHeight: 300, overflow: 'auto', p: 1 }}>
                  <List dense>
                    {criteriosAutoPares.map((criterio) => (
                      <ListItem 
                        key={criterio.id}
                        button
                        onClick={() => handleToggleCriterioAutoPares(criterio.id)}
                      >
                        <ListItemIcon>
                          {selectedCriteriosAutoPares.includes(criterio.id) ? (
                            <CheckBoxIcon color="success" />
                          ) : (
                            <CheckBoxOutlineBlankIcon />
                          )}
                        </ListItemIcon>
                        <ListItemText 
                          primary={criterio.nome_criterio} 
                          secondary={criterio.descricao_criterio}
                        />
                        <ListItemSecondaryAction>
                          <Chip 
                            label={`Peso: ${criterio.peso_padrao}`} 
                            size="small"
                            color="success"
                            variant="outlined"
                          />
                        </ListItemSecondaryAction>
                      </ListItem>
                    ))}
                  </List>
                </Paper>
              </Grid>
            </Grid>
            
            <Box mt={2} display="flex" justifyContent="space-between">
              <Typography variant="body2" color="textSecondary">
                Critérios de Líderes selecionados: {selectedCriteriosLider.length}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Critérios Auto/Pares selecionados: {selectedCriteriosAutoPares.length}
              </Typography>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} startIcon={<CancelIcon />}>
            Cancelar
          </Button>
          <Button 
            onClick={handleSave} 
            variant="contained" 
            disabled={!currentModelo?.nome_modelo || (selectedCriteriosLider.length === 0 && selectedCriteriosAutoPares.length === 0)}
            color="primary"
            startIcon={<SaveIcon />}
          >
            Salvar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ModelosAvaliacao;

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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  Tooltip,
  Chip,
  Divider,
  Alert,
  FormHelperText
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
  Info as InfoIcon
} from '@mui/icons-material';
import { performanceService } from '../../../../services/performanceService';

const CriteriosAvaliacao = () => {
  const [criterios, setCriterios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentCriterio, setCurrentCriterio] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const carregarCriterios = async () => {
      try {
        setLoading(true);
        const data = await performanceService.getCriterios();
        setCriterios(data);
      } catch (err) {
        setError('Erro ao carregar critérios de avaliação');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    carregarCriterios();
  }, []);

  const handleOpenDialog = (criterio = null) => {
    setCurrentCriterio(criterio || {
      nome_criterio: '',
      descricao_criterio: '',
      tipo_criterio: 'quantitativo_escala',
      peso_padrao: 1.0,
      origem_preenchimento_padrao: 'ambos'
    });
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setCurrentCriterio(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentCriterio(prev => ({
      ...prev,
      [name]: name === 'peso_padrao' ? parseFloat(value) : value
    }));
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      const resultado = await performanceService.salvarCriterio(currentCriterio);
      
      if (currentCriterio.id) {
        // Atualizar critério existente na lista
        setCriterios(prev => 
          prev.map(c => c.id === resultado.id ? resultado : c)
        );
      } else {
        // Adicionar novo critério à lista
        setCriterios(prev => [...prev, resultado]);
      }
      
      handleCloseDialog();
    } catch (err) {
      setError('Erro ao salvar critério');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getOrigemPreenchimentoLabel = (origem) => {
    switch (origem) {
      case 'lider': return 'Apenas Líder';
      case 'ambos': return 'Autoavaliação e Pares';
      default: return origem;
    }
  };

  const getOrigemPreenchimentoColor = (origem) => {
    switch (origem) {
      case 'lider': return 'primary';
      case 'ambos': return 'success';
      default: return 'default';
    }
  };

  if (loading && criterios.length === 0) {
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
          Critérios de Avaliação
        </Typography>
        <Button 
          variant="contained" 
          startIcon={<AddIcon />} 
          onClick={() => handleOpenDialog()}
        >
          Novo Critério
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
                  <TableCell>Nome do Critério</TableCell>
                  <TableCell>Descrição</TableCell>
                  <TableCell>Tipo</TableCell>
                  <TableCell>Peso</TableCell>
                  <TableCell>Preenchimento</TableCell>
                  <TableCell align="right">Ações</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {criterios.map((criterio) => (
                  <TableRow key={criterio.id}>
                    <TableCell>{criterio.nome_criterio}</TableCell>
                    <TableCell>{criterio.descricao_criterio}</TableCell>
                    <TableCell>
                      {criterio.tipo_criterio === 'quantitativo_escala' ? 'Escala' : 
                       criterio.tipo_criterio === 'qualitativo_texto' ? 'Texto' : 
                       'Numérico'}
                    </TableCell>
                    <TableCell>{criterio.peso_padrao}</TableCell>
                    <TableCell>
                      <Chip 
                        label={getOrigemPreenchimentoLabel(criterio.origem_preenchimento_padrao)}
                        color={getOrigemPreenchimentoColor(criterio.origem_preenchimento_padrao)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell align="right">
                      <IconButton 
                        size="small" 
                        color="primary" 
                        onClick={() => handleOpenDialog(criterio)}
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

      {/* Diálogo para criar/editar critério */}
      <Dialog open={dialogOpen} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>
          {currentCriterio?.id ? 'Editar Critério' : 'Novo Critério'}
        </DialogTitle>
        <DialogContent dividers>
          <Box component="form" noValidate sx={{ mt: 1 }} display="flex" flexDirection="column" gap={2}>
            <TextField
              fullWidth
              label="Nome do Critério"
              name="nome_criterio"
              value={currentCriterio?.nome_criterio || ''}
              onChange={handleChange}
              required
            />
            
            <TextField
              fullWidth
              label="Descrição"
              name="descricao_criterio"
              value={currentCriterio?.descricao_criterio || ''}
              onChange={handleChange}
              multiline
              rows={2}
            />
            
            <FormControl fullWidth>
              <InputLabel>Tipo de Critério</InputLabel>
              <Select
                name="tipo_criterio"
                value={currentCriterio?.tipo_criterio || 'quantitativo_escala'}
                onChange={handleChange}
                label="Tipo de Critério"
              >
                <MenuItem value="quantitativo_escala">Escala (1-5)</MenuItem>
                <MenuItem value="qualitativo_texto">Texto Descritivo</MenuItem>
                <MenuItem value="meta_numerica">Meta Numérica</MenuItem>
              </Select>
              <FormHelperText>Define como o critério será avaliado</FormHelperText>
            </FormControl>
            
            <FormControl fullWidth>
              <InputLabel>Origem de Preenchimento</InputLabel>
              <Select
                name="origem_preenchimento_padrao"
                value={currentCriterio?.origem_preenchimento_padrao || 'ambos'}
                onChange={handleChange}
                label="Origem de Preenchimento"
              >
                <MenuItem value="lider">Apenas Líder</MenuItem>
                <MenuItem value="ambos">Autoavaliação e Avaliação entre Pares</MenuItem>
              </Select>
              <FormHelperText>Define quem preencherá este critério</FormHelperText>
            </FormControl>
            
            <TextField
              fullWidth
              label="Peso Padrão"
              name="peso_padrao"
              type="number"
              inputProps={{ step: 0.1, min: 0.1, max: 10 }}
              value={currentCriterio?.peso_padrao || 1.0}
              onChange={handleChange}
              helperText="Critérios avaliados pelos líderes tipicamente têm peso maior (1.5 ou maior)"
            />
            
            <Box display="flex" alignItems="center" mt={1}>
              <InfoIcon color="info" fontSize="small" sx={{ mr: 1 }} />
              <Typography variant="caption" color="text.secondary">
                Lembre-se: Os critérios para líderes devem ter peso maior para influenciar mais na nota final.
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
            disabled={!currentCriterio?.nome_criterio}
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

export default CriteriosAvaliacao;

import React, { useState } from 'react';
import { 
  Typography, 
  Paper, 
  Box, 
  Button,
  Stack,
  TextField,
  InputAdornment,
  Divider,
  Card,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Snackbar,
  Alert
} from '@mui/material';
import { 
  Add as AddIcon, 
  Search as SearchIcon,
  FilterList as FilterIcon
} from '@mui/icons-material';
import ListaAvaliacoes from './ListaAvaliacoes';
import NovaAvaliacao from './NovaAvaliacao';
import { TIPOS_AVALIACAO, STATUS_AVALIACAO } from '../../utils/constants';

function Avaliacoes() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingAvaliacao, setEditingAvaliacao] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filtros, setFiltros] = useState({
    tipo: '',
    status: '',
  });
  const [showFilters, setShowFilters] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  const handleCriarAvaliacao = (data) => {
    console.log('Criar avaliação:', data);
    // TODO: Implementar criação via Supabase
    setSnackbar({
      open: true,
      message: 'Avaliação criada com sucesso!',
      severity: 'success'
    });
  };

  const handleEdit = (id) => {
    // TODO: Buscar dados da avaliação no Supabase
    const avaliacaoMock = {
      id,
      colaborador: 'João Silva',
      tipo: 'Desempenho',
      data: '2025-05-19',
      status: 'Pendente',
      observacoes: 'Observações de exemplo'
    };
    
    setEditingAvaliacao(avaliacaoMock);
    setDialogOpen(true);
  };

  const handleDelete = (id) => {
    console.log('Excluir avaliação:', id);
    // TODO: Implementar exclusão via Supabase
    setSnackbar({
      open: true,
      message: 'Avaliação excluída com sucesso!',
      severity: 'success'
    });
  };

  const handleView = (id) => {
    console.log('Visualizar avaliação:', id);
    // TODO: Implementar visualização detalhada
  };

  const handleFiltersChange = (e) => {
    const { name, value } = e.target;
    setFiltros(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const resetFilters = () => {
    setFiltros({
      tipo: '',
      status: ''
    });
  };

  const closeSnackbar = () => {
    setSnackbar(prev => ({
      ...prev,
      open: false
    }));
  };

  return (
    <Stack spacing={3}>
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 2
      }}>
        <Typography variant="h5" fontWeight="bold">
          Avaliações
        </Typography>
        <Button 
          variant="contained" 
          startIcon={<AddIcon />}
          onClick={() => {
            setEditingAvaliacao(null);
            setDialogOpen(true);
          }}
        >
          Nova Avaliação
        </Button>
      </Box>

      <Card sx={{ p: 2 }}>
        <Stack spacing={2}>
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center',
            gap: 2,
            flexWrap: { xs: 'wrap', md: 'nowrap' }
          }}>
            <TextField
              placeholder="Pesquisar avaliações..."
              variant="outlined"
              size="small"
              fullWidth
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
            <Button
              variant="outlined"
              startIcon={<FilterIcon />}
              onClick={() => setShowFilters(!showFilters)}
              sx={{ whiteSpace: 'nowrap' }}
            >
              Filtros
            </Button>
          </Box>
          
          {showFilters && (
            <Box sx={{ 
              display: 'flex', 
              gap: 2,
              flexWrap: { xs: 'wrap', md: 'nowrap' },
              pt: 1
            }}>
              <FormControl size="small" fullWidth>
                <InputLabel id="tipo-filter-label">Tipo</InputLabel>
                <Select
                  labelId="tipo-filter-label"
                  id="tipo-filter"
                  name="tipo"
                  value={filtros.tipo}
                  label="Tipo"
                  onChange={handleFiltersChange}
                >
                  <MenuItem value="">Todos</MenuItem>
                  {Object.entries(TIPOS_AVALIACAO).map(([key, value]) => (
                    <MenuItem key={key} value={value}>{value}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              
              <FormControl size="small" fullWidth>
                <InputLabel id="status-filter-label">Status</InputLabel>
                <Select
                  labelId="status-filter-label"
                  id="status-filter"
                  name="status"
                  value={filtros.status}
                  label="Status"
                  onChange={handleFiltersChange}
                >
                  <MenuItem value="">Todos</MenuItem>
                  {Object.entries(STATUS_AVALIACAO).map(([key, value]) => (
                    <MenuItem key={key} value={value}>{value}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              
              <Button variant="text" onClick={resetFilters} sx={{ whiteSpace: 'nowrap' }}>
                Limpar Filtros
              </Button>
            </Box>
          )}
        </Stack>
      </Card>

      <Card>
        <ListaAvaliacoes 
          searchTerm={searchTerm} 
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </Card>

      <NovaAvaliacao 
        open={dialogOpen} 
        onClose={() => setDialogOpen(false)}
        avaliacao={editingAvaliacao}
        onSubmit={handleCriarAvaliacao}
      />

      <Snackbar 
        open={snackbar.open} 
        autoHideDuration={6000} 
        onClose={closeSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={closeSnackbar} 
          severity={snackbar.severity} 
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Stack>
  );
}

export default Avaliacoes;
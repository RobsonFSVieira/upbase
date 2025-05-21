import React from 'react';
import { 
  Box, 
  Grid, 
  TextField, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  IconButton,
  Paper,
  Collapse,
  Button
} from '@mui/material';
import { 
  Search as SearchIcon,
  FilterList as FilterIcon,
  Clear as ClearIcon
} from '@mui/icons-material';

const PerformanceFilters = ({ filters, setFilters, expanded, toggleExpanded }) => {
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleClearFilters = () => {
    setFilters({
      employeeName: '',
      department: '',
      period: '',
      rating: ''
    });
  };

  // Opções de filtro para o seletor de classificação
  const ratingOptions = [
    { value: '', label: 'Todas' },
    { value: '5', label: 'Excelente' },
    { value: '4', label: 'Muito Bom' },
    { value: '3', label: 'Bom' },
    { value: '2', label: 'Regular' },
    { value: '1', label: 'Precisa Melhorar' }
  ];

  return (
    <Paper sx={{ p: 2, mb: 3 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box display="flex" alignItems="center">
          <IconButton onClick={toggleExpanded} size="small">
            <FilterIcon />
          </IconButton>
          <TextField
            name="employeeName"
            placeholder="Buscar por nome..."
            variant="outlined"
            size="small"
            value={filters.employeeName}
            onChange={handleFilterChange}
            InputProps={{
              startAdornment: <SearchIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
            }}
            sx={{ ml: 1, minWidth: 250 }}
          />
        </Box>
        
        {(filters.employeeName || filters.department || filters.period || filters.rating) && (
          <Button
            startIcon={<ClearIcon />}
            onClick={handleClearFilters}
            size="small"
          >
            Limpar Filtros
          </Button>
        )}
      </Box>

      <Collapse in={expanded}>
        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              name="department"
              label="Departamento"
              variant="outlined"
              size="small"
              value={filters.department}
              onChange={handleFilterChange}
            />
          </Grid>
          
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              name="period"
              label="Período"
              variant="outlined"
              size="small"
              value={filters.period}
              onChange={handleFilterChange}
              placeholder="Ex: 2023 Q1"
            />
          </Grid>
          
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth size="small">
              <InputLabel>Classificação</InputLabel>
              <Select
                name="rating"
                value={filters.rating}
                onChange={handleFilterChange}
                label="Classificação"
              >
                {ratingOptions.map(option => (
                  <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Collapse>
    </Paper>
  );
};

export default PerformanceFilters;

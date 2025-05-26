import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TextField,
  InputAdornment,
  IconButton,
  Chip,
  Tabs,
  Tab,
  Tooltip,
  Avatar,
  CircularProgress,
  Alert
} from '@mui/material';
import {
  Search as SearchIcon,
  FilterList as FilterIcon,
  Assessment,
  Group,
  Edit as EditIcon,
  Visibility as ViewIcon,
} from '@mui/icons-material';
import PageHeader from '../../components/common/PageHeader';
import { useAvaliacao } from '../../contexts/AvaliacaoContext';

const Colaboradores = () => {
  const [tabValue, setTabValue] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const { dashboardStats, loading, error } = useAvaliacao();

  const colaboradores = [
    {
      id: 1,
      nome: 'João Silva',
      cargo: 'Desenvolvedor',
      departamento: 'Desenvolvimento',
      turno: 'A',
      avaliacao: 4.5,
      status: 'ativo'
    },
    {
      id: 2,
      nome: 'Maria Oliveira',
      cargo: 'Analista de Marketing',
      departamento: 'Marketing',
      turno: 'B',
      avaliacao: 4.2,
      status: 'ativo'
    },
    {
      id: 3,
      nome: 'Carlos Santos',
      cargo: 'Analista de RH',
      departamento: 'Recursos Humanos',
      turno: 'A',
      avaliacao: 4.0,
      status: 'ativo'
    }
  ];

  const getInitials = (name) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  };

  const filteredColaboradores = colaboradores.filter(col =>
    col.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    col.departamento.toLowerCase().includes(searchTerm.toLowerCase()) ||
    col.cargo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderVisaoGeral = () => (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6} lg={3}>
        <Card>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Group color="primary" sx={{ mr: 1 }} />
              <Typography variant="h6">Total Colaboradores</Typography>
            </Box>
            <Typography variant="h4">{dashboardStats?.totalColaboradores || '0'}</Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} md={6} lg={3}>
        <Card>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Assessment color="success" sx={{ mr: 1 }} />
              <Typography variant="h6">Média Avaliações</Typography>
            </Box>
            <Typography variant="h4">{dashboardStats?.mediaAvaliacoes || '0'}</Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );

  const renderLista = () => (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Colaborador</TableCell>
            <TableCell>Cargo</TableCell>
            <TableCell>Departamento</TableCell>
            <TableCell>Turno</TableCell>
            <TableCell>Última Avaliação</TableCell>
            <TableCell>Status</TableCell>
            <TableCell align="right">Ações</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredColaboradores.map((colaborador) => (
            <TableRow key={colaborador.id}>
              <TableCell>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Avatar sx={{ mr: 2, bgcolor: 'primary.main' }}>
                    {getInitials(colaborador.nome)}
                  </Avatar>
                  <Typography>{colaborador.nome}</Typography>
                </Box>
              </TableCell>
              <TableCell>{colaborador.cargo}</TableCell>
              <TableCell>{colaborador.departamento}</TableCell>
              <TableCell>{colaborador.turno}</TableCell>
              <TableCell>{colaborador.avaliacao}</TableCell>
              <TableCell>
                <Chip
                  label={colaborador.status === 'ativo' ? 'Ativo' : 'Inativo'}
                  color={colaborador.status === 'ativo' ? 'success' : 'default'}
                  size="small"
                />
              </TableCell>
              <TableCell align="right">
                <Tooltip title="Visualizar">
                  <IconButton size="small">
                    <ViewIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Editar">
                  <IconButton size="small">
                    <EditIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" p={3}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ m: 2 }}>
        {error}
      </Alert>
    );
  }

  return (
    <Box>
      <PageHeader title="Colaboradores" />
      
      <Box sx={{ mb: 3 }}>
        <Tabs
          value={tabValue}
          onChange={(_, newValue) => setTabValue(newValue)}
        >
          <Tab label="Visão Geral" />
          <Tab label="Lista" />
        </Tabs>
      </Box>

      <Box sx={{ mb: 3, display: 'flex', gap: 2 }}>
        <TextField
          fullWidth
          placeholder="Pesquisar colaboradores..."
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
        <IconButton>
          <FilterIcon />
        </IconButton>
      </Box>

      {tabValue === 0 ? renderVisaoGeral() : renderLista()}
    </Box>
  );
};

export default Colaboradores;

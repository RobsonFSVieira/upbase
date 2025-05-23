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
} from '@mui/material';
import {
  Search as SearchIcon,
  FilterList as FilterIcon,
  Assessment,
  Group,
  Edit as EditIcon,
  Visibility as ViewIcon,
} from '@mui/icons-material';

// Dados mockados
const mockData = {
  stats: {
    total: 48,
    ativos: 45,
    afastados: 3,
    turnos: {
      A: 12,
      B: 12,
      C: 12,
      D: 9,
      ADM: 3
    }
  },
  colaboradores: [
    {
      id: 1,
      nome: 'João Silva',
      matricula: '12345',
      email: 'joao.silva@grupocesari.com.br',
      turno: 'A',
      cargo: 'Operador I',
      lider: 'Carlos Souza',
      tempoEmpresa: '2 anos',
      status: 'ativo',
      avaliacoesPendentes: 1
    },
    {
      id: 2,
      nome: 'Maria Santos',
      matricula: '12346',
      email: 'maria.santos@grupocesari.com.br',
      turno: 'B',
      cargo: 'Operador II',
      lider: 'Carlos Souza',
      tempoEmpresa: '3 anos',
      status: 'ativo',
      avaliacoesPendentes: 0
    },
    {
      id: 3,
      nome: 'Pedro Oliveira',
      matricula: '12347',
      email: 'pedro.oliveira@grupocesari.com.br',
      turno: 'C',
      cargo: 'Técnico',
      lider: 'Ana Paula',
      tempoEmpresa: '1 ano',
      status: 'afastado',
      avaliacoesPendentes: 0
    },
    // Adicione mais colaboradores conforme necessário
  ]
};

const Colaboradores = () => {
  const [tabValue, setTabValue] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');

  const renderVisaoGeral = () => (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6} lg={3}>
        <Card>
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Total de Colaboradores
            </Typography>
            <Typography variant="h4">{mockData.stats.total}</Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>
              Ativos: {mockData.stats.ativos} | Afastados: {mockData.stats.afastados}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <Card>
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Distribuição por Turno
            </Typography>
            {Object.entries(mockData.stats.turnos).map(([turno, quantidade]) => (
              <Typography key={turno}>
                Turno {turno}: {quantidade}
              </Typography>
            ))}
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );

  const renderListagem = () => (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Colaborador</TableCell>
            <TableCell>Matrícula</TableCell>
            <TableCell>Turno</TableCell>
            <TableCell>Cargo</TableCell>
            <TableCell>Líder</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Avaliações</TableCell>
            <TableCell>Ações</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {mockData.colaboradores.map((col) => (
            <TableRow key={col.id}>
              <TableCell>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Avatar sx={{ width: 32, height: 32 }}>
                    {col.nome[0]}
                  </Avatar>
                  <Box>
                    <Typography variant="body2">{col.nome}</Typography>
                    <Typography variant="caption" color="textSecondary">
                      {col.email}
                    </Typography>
                  </Box>
                </Box>
              </TableCell>
              <TableCell>{col.matricula}</TableCell>
              <TableCell>
                <Chip label={`Turno ${col.turno}`} size="small" />
              </TableCell>
              <TableCell>{col.cargo}</TableCell>
              <TableCell>{col.lider}</TableCell>
              <TableCell>
                <Chip
                  label={col.status === 'ativo' ? 'Ativo' : 'Afastado'}
                  color={col.status === 'ativo' ? 'success' : 'warning'}
                  size="small"
                />
              </TableCell>
              <TableCell>
                {col.avaliacoesPendentes > 0 ? (
                  <Chip
                    label={`${col.avaliacoesPendentes} pendente(s)`}
                    color="warning"
                    size="small"
                  />
                ) : (
                  <Chip label="Em dia" color="success" size="small" />
                )}
              </TableCell>
              <TableCell>
                <Tooltip title="Visualizar Perfil">
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

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Colaboradores
      </Typography>

      <Box sx={{ mb: 3 }}>
        <Tabs value={tabValue} onChange={(e, newValue) => setTabValue(newValue)}>
          <Tab icon={<Assessment />} label="Visão Geral" />
          <Tab icon={<Group />} label="Listagem" />
        </Tabs>
      </Box>

      <Box sx={{ mb: 3 }}>
        <TextField
          fullWidth
          placeholder="Buscar por nome, matrícula ou cargo..."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton>
                  <FilterIcon />
                </IconButton>
              </InputAdornment>
            )
          }}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Box>

      {tabValue === 0 ? renderVisaoGeral() : renderListagem()}
    </Box>
  );
};

export default Colaboradores;

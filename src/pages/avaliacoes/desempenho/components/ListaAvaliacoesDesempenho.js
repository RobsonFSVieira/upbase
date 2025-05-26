import React, { useState } from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Chip,
  TextField,
  InputAdornment,
  Typography,
  CircularProgress,
  Alert
} from '@mui/material';
import {
  Visibility as VisibilityIcon,
  Edit as EditIcon,
  Search as SearchIcon
} from '@mui/icons-material';
import { useAvaliacao } from '../../../../contexts/AvaliacaoContext';

export default function ListaAvaliacoesDesempenho() {
  const [searchTerm, setSearchTerm] = useState('');
  const { avaliacoesPendentes, avaliacoesEmAndamento, loading, error } = useAvaliacao();

  console.log('ListaAvaliacoesDesempenho rendered with:', {
    avaliacoesPendentes,
    avaliacoesEmAndamento
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'pendente_autoavaliacao':
      case 'pendente_lider':
        return 'warning';
      case 'concluida':
        return 'success';
      case 'em_andamento':
        return 'info';
      default:
        return 'default';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'pendente_autoavaliacao':
        return 'Pendente Autoavaliação';
      case 'pendente_lider':
        return 'Pendente Líder';
      case 'concluida':
        return 'Concluída';
      case 'em_andamento':
        return 'Em Andamento';
      default:
        return status;
    }
  };

  // Combina todas as avaliações
  const allAvaliacoes = [...(avaliacoesPendentes || []), ...(avaliacoesEmAndamento || [])];
  
  // Filtra apenas se houver termo de pesquisa
  const filteredAvaliacoes = searchTerm 
    ? allAvaliacoes.filter(av => 
        av.nome_colaborador?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        av.departamento?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : allAvaliacoes;

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
    <Box p={3}>
      <Box mb={3}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Pesquisar por nome ou departamento..."
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
      </Box>

      {filteredAvaliacoes.length === 0 ? (
        <Typography color="textSecondary" align="center">
          Nenhuma avaliação encontrada
        </Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Colaborador</TableCell>
                <TableCell>Departamento</TableCell>
                <TableCell>Período</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Nota Final</TableCell>
                <TableCell align="right">Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredAvaliacoes.map((avaliacao) => (
                <TableRow key={avaliacao.id}>
                  <TableCell>{avaliacao.nome_colaborador}</TableCell>
                  <TableCell>{avaliacao.departamento}</TableCell>
                  <TableCell>{avaliacao.periodo}</TableCell>
                  <TableCell>
                    <Chip
                      label={getStatusLabel(avaliacao.status_avaliacao)}
                      color={getStatusColor(avaliacao.status_avaliacao)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    {avaliacao.nota_final_calculada 
                      ? avaliacao.nota_final_calculada.toFixed(1)
                      : '-'
                    }
                  </TableCell>
                  <TableCell align="right">
                    <IconButton 
                      size="small"
                      title="Visualizar"
                    >
                      <VisibilityIcon fontSize="small" />
                    </IconButton>
                    <IconButton 
                      size="small"
                      title="Editar"
                      sx={{ ml: 1 }}
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
}

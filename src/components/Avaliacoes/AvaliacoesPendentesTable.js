import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  IconButton,
  Avatar,
  Box,
  Typography
} from '@mui/material';
import { Assessment as AssessmentIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const AvaliacoesPendentesTable = () => {
  const navigate = useNavigate();
  
  // Dados mockados - em produção viriam do contexto ou props
  const avaliacoesPendentes = [
    {
      id: 1,
      colaborador: 'João Silva',
      turno: 'A',
      tipo: 'autoavaliacao',
      prazo: '2024-03-15',
      status: 'pendente'
    },
    {
      id: 2,
      colaborador: 'Maria Santos',
      turno: 'B',
      tipo: 'lider',
      prazo: '2024-03-20',
      status: 'em_andamento'
    }
  ];

  const getStatusChip = (status) => {
    const config = {
      pendente: { label: 'Pendente', color: 'warning' },
      em_andamento: { label: 'Em Andamento', color: 'info' },
      concluida: { label: 'Concluída', color: 'success' }
    };

    return <Chip 
      label={config[status].label} 
      color={config[status].color} 
      size="small" 
    />;
  };

  const handleAvaliar = (id) => {
    navigate(`/avaliacoes/realizar/${id}`);
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Colaborador</TableCell>
            <TableCell>Turno</TableCell>
            <TableCell>Tipo</TableCell>
            <TableCell>Prazo</TableCell>
            <TableCell>Status</TableCell>
            <TableCell align="right">Ações</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {avaliacoesPendentes.map((avaliacao) => (
            <TableRow key={avaliacao.id}>
              <TableCell>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Avatar sx={{ width: 32, height: 32 }}>
                    {avaliacao.colaborador[0]}
                  </Avatar>
                  <Typography variant="body2">
                    {avaliacao.colaborador}
                  </Typography>
                </Box>
              </TableCell>
              <TableCell>
                <Chip label={`Turno ${avaliacao.turno}`} size="small" />
              </TableCell>
              <TableCell>
                {avaliacao.tipo === 'autoavaliacao' ? 'Autoavaliação' : 'Avaliação do Líder'}
              </TableCell>
              <TableCell>
                {new Date(avaliacao.prazo).toLocaleDateString()}
              </TableCell>
              <TableCell>
                {getStatusChip(avaliacao.status)}
              </TableCell>
              <TableCell align="right">
                <IconButton 
                  color="primary" 
                  onClick={() => handleAvaliar(avaliacao.id)}
                  size="small"
                >
                  <AssessmentIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AvaliacoesPendentesTable;

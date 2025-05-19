import React from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  IconButton,
  Tooltip
} from '@mui/material';
import { Edit, Delete, Visibility } from '@mui/icons-material';

const avaliacoesTemp = [
  {
    id: 1,
    colaborador: 'João Silva',
    tipo: 'Desempenho',
    data: '2025-05-19',
    status: 'Pendente'
  },
  {
    id: 2,
    colaborador: 'Maria Santos',
    tipo: 'Experiência',
    data: '2025-05-18',
    status: 'Concluída'
  }
];

function ListaAvaliacoes() {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Colaborador</TableCell>
            <TableCell>Tipo</TableCell>
            <TableCell>Data</TableCell>
            <TableCell>Status</TableCell>
            <TableCell align="center">Ações</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {avaliacoesTemp.map((avaliacao) => (
            <TableRow key={avaliacao.id}>
              <TableCell>{avaliacao.colaborador}</TableCell>
              <TableCell>{avaliacao.tipo}</TableCell>
              <TableCell>{avaliacao.data}</TableCell>
              <TableCell>{avaliacao.status}</TableCell>
              <TableCell align="center">
                <Tooltip title="Visualizar">
                  <IconButton size="small" color="primary">
                    <Visibility />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Editar">
                  <IconButton size="small" color="primary">
                    <Edit />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Excluir">
                  <IconButton size="small" color="error">
                    <Delete />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ListaAvaliacoes;
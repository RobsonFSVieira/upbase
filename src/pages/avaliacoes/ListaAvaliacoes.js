import React, { useState } from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Tooltip,
  Chip,
  TablePagination,
  Box
} from '@mui/material';
import { Edit, Delete, Visibility } from '@mui/icons-material';
import { STATUS_AVALIACAO } from '../../utils/constants';

// Dados temporários para desenvolvimento
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
  },
  {
    id: 3,
    colaborador: 'Carlos Oliveira',
    tipo: 'Feedback',
    data: '2025-05-17',
    status: 'Em Andamento'
  },
  {
    id: 4,
    colaborador: 'Ana Pereira',
    tipo: 'Desempenho',
    data: '2025-05-16',
    status: 'Pendente'
  },
  {
    id: 5,
    colaborador: 'Roberto Alves',
    tipo: 'Experiência',
    data: '2025-05-15',
    status: 'Concluída'
  }
];

function ListaAvaliacoes({ searchTerm, onView, onEdit, onDelete }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredAvaliacoes = avaliacoesTemp.filter(avaliacao => 
    avaliacao.colaborador.toLowerCase().includes(searchTerm?.toLowerCase() || '') ||
    avaliacao.tipo.toLowerCase().includes(searchTerm?.toLowerCase() || '') ||
    avaliacao.status.toLowerCase().includes(searchTerm?.toLowerCase() || '')
  );

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pendente':
        return { bg: '#FEF3C7', color: '#D97706' };
      case 'Em Andamento':
        return { bg: '#DBEAFE', color: '#2563EB' };
      case 'Concluída':
        return { bg: '#D1FAE5', color: '#059669' };
      default:
        return { bg: '#F3F4F6', color: '#6B7280' };
    }
  };

  return (
    <>
      <TableContainer>
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
            {filteredAvaliacoes
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((avaliacao) => {
                const statusStyle = getStatusColor(avaliacao.status);
                
                return (
                  <TableRow key={avaliacao.id}>
                    <TableCell>{avaliacao.colaborador}</TableCell>
                    <TableCell>{avaliacao.tipo}</TableCell>
                    <TableCell>
                      {new Date(avaliacao.data).toLocaleDateString('pt-BR')}
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={avaliacao.status} 
                        size="small"
                        sx={{ 
                          backgroundColor: statusStyle.bg,
                          color: statusStyle.color,
                          fontWeight: 500
                        }}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                        <Tooltip title="Visualizar">
                          <IconButton 
                            size="small" 
                            color="primary"
                            onClick={() => onView && onView(avaliacao.id)}
                          >
                            <Visibility fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Editar">
                          <IconButton 
                            size="small" 
                            color="primary"
                            onClick={() => onEdit && onEdit(avaliacao.id)}
                          >
                            <Edit fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Excluir">
                          <IconButton 
                            size="small" 
                            color="error"
                            onClick={() => onDelete && onDelete(avaliacao.id)}
                          >
                            <Delete fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredAvaliacoes.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage="Linhas por página:"
        labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count}`}
      />
    </>
  );
}

export default ListaAvaliacoes;
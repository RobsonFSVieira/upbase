import React, { useState } from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  InputAdornment
} from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import { atestadosData } from '../../services/atestadosData';

export default function Atestados() {
  const [searchTerm, setSearchTerm] = useState('');

  // Filtra os atestados baseado no termo de busca
  const atestadosFiltrados = atestadosData.filter(atestado =>
    atestado.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    atestado.re.includes(searchTerm) ||
    atestado.cid.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box p={3}>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Atestados Médicos
      </Typography>

      <Box mb={3}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Pesquisar por nome, RE ou CID..."
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

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell>RE</TableCell>
              <TableCell>Turno</TableCell>
              <TableCell>Data</TableCell>
              <TableCell>CID</TableCell>
              <TableCell>Descrição</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {atestadosFiltrados.map((atestado) => (
              <TableRow key={atestado.id}>
                <TableCell>{atestado.nome}</TableCell>
                <TableCell>{atestado.re}</TableCell>
                <TableCell>{atestado.turno}</TableCell>
                <TableCell>{new Date(atestado.dataAtestado).toLocaleDateString('pt-BR')}</TableCell>
                <TableCell>{atestado.cid}</TableCell>
                <TableCell>{atestado.descricaoCid}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

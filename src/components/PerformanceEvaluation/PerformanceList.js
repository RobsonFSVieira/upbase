import React, { useState, useEffect, useCallback } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  Button,
  Box 
} from '@mui/material';
import { performanceService } from '../../services/performanceService';
import { exportService } from '../../services/exportService';
import PerformanceFilters from './PerformanceFilters';

const PerformanceList = ({ onError, onLoadingChange, isLoading }) => {
  const [evaluations, setEvaluations] = useState([]);
  const [filteredEvaluations, setFilteredEvaluations] = useState([]);
  const [filters, setFilters] = useState({
    employeeName: '',
    department: '',
    period: '',
    rating: ''
  });

  const loadEvaluations = useCallback(async () => {
    try {
      onLoadingChange(true);
      const response = await performanceService.getAll();
      if (response) {
        setEvaluations(response);
        setFilteredEvaluations(response);
      }
    } catch (error) {
      onError(error);
      setEvaluations([]);
      setFilteredEvaluations([]);
    } finally {
      onLoadingChange(false);
    }
  }, [onLoadingChange, onError]);

  useEffect(() => {
    loadEvaluations();
  }, [loadEvaluations]);

  useEffect(() => {
    applyFilters();
  }, [filters, evaluations]);

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  };

  const applyFilters = () => {
    let filtered = evaluations;

    if (filters.employeeName) {
      filtered = filtered.filter(item => 
        item.employeeName.toLowerCase().includes(filters.employeeName.toLowerCase())
      );
    }
    if (filters.department) {
      filtered = filtered.filter(item =>
        item.department.toLowerCase().includes(filters.department.toLowerCase())
      );
    }
    if (filters.period) {
      filtered = filtered.filter(item =>
        item.period.includes(filters.period)
      );
    }
    if (filters.rating) {
      filtered = filtered.filter(item =>
        item.rating === filters.rating
      );
    }

    setFilteredEvaluations(filtered);
  };

  const handleExportExcel = () => {
    try {
      exportService.toExcel(filteredEvaluations);
    } catch (error) {
      console.error('Erro ao exportar para Excel:', error);
      // Adicione aqui sua lógica de tratamento de erro (ex: toast, alert, etc)
    }
  };

  const handleExportPDF = () => {
    try {
      exportService.toPDF(filteredEvaluations);
    } catch (error) {
      console.error('Erro ao exportar para PDF:', error);
      // Adicione aqui sua lógica de tratamento de erro (ex: toast, alert, etc)
    }
  };

  if (isLoading) {
    return null;
  }

  return (
    <Box className="mt-4">
      <PerformanceFilters 
        filters={filters}
        onFilterChange={handleFilterChange}
      />
      
      <div className="d-flex justify-content-between mb-3">
        <h2>Lista de Avaliações</h2>
        <div>
          <Button 
            variant="contained" 
            color="success" 
            onClick={handleExportExcel}
            disabled={!filteredEvaluations.length}
            size="small"
          >
            Exportar Excel
          </Button>
          <Button 
            variant="contained" 
            color="error" 
            onClick={handleExportPDF}
            disabled={!filteredEvaluations.length}
            size="small"
            style={{ marginLeft: '8px' }}
          >
            Exportar PDF
          </Button>
        </div>
      </div>

      {filteredEvaluations.length > 0 ? (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Funcionário</TableCell>
                <TableCell>Departamento</TableCell>
                <TableCell>Período</TableCell>
                <TableCell>Classificação</TableCell>
                <TableCell>Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredEvaluations.map((evaluation) => (
                <TableRow key={evaluation.id}>
                  <TableCell>{evaluation.employeeName}</TableCell>
                  <TableCell>{evaluation.department}</TableCell>
                  <TableCell>{evaluation.period}</TableCell>
                  <TableCell>{evaluation.rating}</TableCell>
                  <TableCell>
                    <Button variant="contained" size="small" as={Link} to={`/performance-evaluation/${evaluation.id}`}>
                      Ver Detalhes
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Alert variant="info">
          Nenhuma avaliação encontrada.
        </Alert>
      )}
    </Box>
  );
};

export default PerformanceList;

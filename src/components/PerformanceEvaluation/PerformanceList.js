import React, { useState, useEffect } from 'react';
import { Container, Table, Button, ButtonGroup, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { performanceService } from '../../services/performanceService';
import { exportService } from '../../services/exportService';
import PerformanceFilters from './PerformanceFilters';

const PerformanceList = ({ onError, setLoading }) => {
  const [evaluations, setEvaluations] = useState([]);
  const [filteredEvaluations, setFilteredEvaluations] = useState([]);
  const [filters, setFilters] = useState({
    employeeName: '',
    department: '',
    period: '',
    rating: ''
  });

  useEffect(() => {
    loadEvaluations();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filters, evaluations]);

  const loadEvaluations = async () => {
    try {
      setLoading(true);
      const response = await performanceService.getAll();
      setEvaluations(response || []);
      setFilteredEvaluations(response || []);
    } catch (error) {
      onError(error);
      setEvaluations([]);
      setFilteredEvaluations([]);
    } finally {
      setLoading(false);
    }
  };

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

  return (
    <Container className="mt-4">
      <PerformanceFilters 
        filters={filters}
        onFilterChange={handleFilterChange}
      />
      
      <div className="d-flex justify-content-between mb-3">
        <h2>Lista de Avaliações</h2>
        <ButtonGroup>
          <Button 
            variant="success" 
            onClick={handleExportExcel}
            disabled={!filteredEvaluations.length}
          >
            Exportar Excel
          </Button>
          <Button 
            variant="danger" 
            onClick={handleExportPDF}
            disabled={!filteredEvaluations.length}
          >
            Exportar PDF
          </Button>
        </ButtonGroup>
      </div>

      {filteredEvaluations.length > 0 ? (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Funcionário</th>
              <th>Departamento</th>
              <th>Período</th>
              <th>Classificação</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {filteredEvaluations.map((evaluation) => (
              <tr key={evaluation.id}>
                <td>{evaluation.employeeName}</td>
                <td>{evaluation.department}</td>
                <td>{evaluation.period}</td>
                <td>{evaluation.rating}</td>
                <td>
                  <Button variant="info" size="sm" as={Link} to={`/performance-evaluation/${evaluation.id}`}>
                    Ver Detalhes
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <Alert variant="info">
          Nenhuma avaliação encontrada.
        </Alert>
      )}
    </Container>
  );
};

export default PerformanceList;

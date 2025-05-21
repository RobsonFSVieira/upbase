import React, { useState, useEffect } from 'react';
import { Container, Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import performanceService from '../../services/performanceService';

const PerformanceList = () => {
  const [evaluations, setEvaluations] = useState([]);

  useEffect(() => {
    loadEvaluations();
  }, []);

  const loadEvaluations = async () => {
    try {
      const response = await performanceService.getEvaluations();
      setEvaluations(response.data);
    } catch (error) {
      console.error('Erro ao carregar avaliações:', error);
    }
  };

  return (
    <Container className="mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Lista de Avaliações</h2>
        <Button as={Link} to="/performance-evaluation/new" variant="primary">
          Nova Avaliação
        </Button>
      </div>
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
          {evaluations.map((evaluation) => (
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
    </Container>
  );
};

export default PerformanceList;

import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Badge } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { performanceService } from '../../services/performanceService';

const PerformanceDetail = () => {
  const [evaluation, setEvaluation] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const loadEvaluation = async () => {
      try {
        const data = await performanceService.getById(id);
        setEvaluation(data);
      } catch (error) {
        console.error('Erro ao carregar avaliação:', error);
      }
    };

    loadEvaluation();
  }, [id]);

  if (!evaluation) return <div>Carregando...</div>;

  return (
    <Card>
      <Card.Header>
        <h4>{evaluation.employeeName}</h4>
        <Badge bg={evaluation.rating >= 4 ? 'success' : 'warning'}>
          {evaluation.rating}/5
        </Badge>
      </Card.Header>
      <Card.Body>
        <Row>
          <Col md={6}>
            <h5>Departamento</h5>
            <p>{evaluation.department}</p>
          </Col>
          <Col md={6}>
            <h5>Período</h5>
            <p>{evaluation.period}</p>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col>
            <h5>Metas Atingidas</h5>
            <p>{evaluation.goals}</p>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col>
            <h5>Competências</h5>
            <p>{evaluation.skills}</p>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col>
            <h5>Comentários</h5>
            <p>{evaluation.comments}</p>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default PerformanceDetail;

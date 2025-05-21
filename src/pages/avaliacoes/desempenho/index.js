import React, { useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PerformanceList from '../../../components/PerformanceEvaluation/PerformanceList';
import AvaliacaoPaginada from '../../../features/avaliacoes/components/AvaliacaoPaginada';

const AvaliacoesDesempenho = () => {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <Container fluid>
      <Row className="mb-4">
        <Col>
          <h2>Avaliações de Desempenho</h2>
        </Col>
        <Col xs="auto">
          <Button 
            variant="primary"
            onClick={() => setDialogOpen(true)}
          >
            Nova Avaliação
          </Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <PerformanceList />
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {dialogOpen && (
        <AvaliacaoPaginada
          onClose={() => setDialogOpen(false)}
          onComplete={() => {
            setDialogOpen(false);
            // Implementar lógica de conclusão
          }}
        />
      )}
    </Container>
  );
};

export default AvaliacoesDesempenho;
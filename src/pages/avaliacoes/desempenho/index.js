import React, { useState } from 'react';
import { Container, Row, Col, Card, Alert, Spinner, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PerformanceList from '../../../components/PerformanceEvaluation/PerformanceList';
import AvaliacaoPaginada from '../../../features/avaliacoes/components/AvaliacaoPaginada';

const AvaliacoesDesempenho = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleError = (error) => {
    console.error('Erro:', error);
    setError('Ocorreu um erro ao carregar os dados. Por favor, tente novamente.');
  };

  return (
    <Container fluid>
      {error && (
        <Alert variant="danger" onClose={() => setError(null)} dismissible>
          {error}
        </Alert>
      )}
      
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
              {loading ? (
                <div className="text-center">
                  <Spinner animation="border" />
                </div>
              ) : (
                <PerformanceList onError={handleError} setLoading={setLoading} />
              )}
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
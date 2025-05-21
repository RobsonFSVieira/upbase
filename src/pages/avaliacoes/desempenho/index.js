import React, { useState, useCallback } from 'react';
import { Container, Row, Col, Card, Alert, Spinner, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PerformanceList from '../../../components/PerformanceEvaluation/PerformanceList';
import AvaliacaoPaginada from '../../../features/avaliacoes/components/AvaliacaoPaginada';

const AvaliacoesDesempenho = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const handleError = useCallback((error) => {
    console.error('Erro:', error);
    setError('Ocorreu um erro ao carregar os dados. Por favor, tente novamente.');
    setIsLoading(false);
  }, []);

  const handleLoadingChange = useCallback((loading) => {
    setIsLoading(loading);
  }, []);

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
              <PerformanceList 
                onError={handleError} 
                onLoadingChange={handleLoadingChange}
                isLoading={isLoading}
              />
              {isLoading && (
                <div className="text-center position-absolute top-50 start-50 translate-middle">
                  <Spinner animation="border" />
                </div>
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
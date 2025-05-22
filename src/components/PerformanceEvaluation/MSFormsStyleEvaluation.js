import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Rating,
  TextField,
  Card,
  CardContent,
  Button,
  Stepper,
  Step,
  StepLabel,
  CircularProgress,
  Alert
} from '@mui/material';
import { performanceService } from '../../services/performanceService';

const MSFormsStyleEvaluation = ({ avaliacaoId, isLider, onComplete }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [criterios, setCriterios] = useState([]);
  const [respostas, setRespostas] = useState({});

  useEffect(() => {
    const carregarCriterios = async () => {
      try {
        setLoading(true);
        let criteriosData;
        
        if (isLider) {
          criteriosData = await performanceService.getCriterios('lider');
        } else {
          criteriosData = await performanceService.getCriterios('ambos');
        }
        
        setCriterios(criteriosData);
      } catch (err) {
        console.error('Erro ao carregar critérios:', err);
        setError('Ocorreu um erro ao carregar os critérios de avaliação');
      } finally {
        setLoading(false);
      }
    };
    
    carregarCriterios();
  }, [isLider]);

  const handleNext = () => {
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const handleRatingChange = (criterioId, value) => {
    setRespostas(prev => ({
      ...prev,
      [criterioId]: value
    }));
  };

  const handleSubmit = () => {
    if (onComplete) {
      onComplete(respostas);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" p={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mt: 2 }}>
        {error}
      </Alert>
    );
  }

  const steps = ['Avaliação', 'Revisão', 'Conclusão'];

  return (
    <Box sx={{ width: '100%', mt: 3 }}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Box sx={{ mt: 4 }}>
        {activeStep === 0 && (
          <Box>
            {criterios.map((criterio) => (
              <Card key={criterio.id} sx={{ mb: 2 }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {criterio.nome_criterio}
                  </Typography>
                  <Typography color="textSecondary" paragraph>
                    {criterio.descricao_criterio}
                  </Typography>
                  <Box sx={{ mt: 2 }}>
                    <Rating
                      name={`rating-${criterio.id}`}
                      value={respostas[criterio.id] || 0}
                      onChange={(event, value) => handleRatingChange(criterio.id, value)}
                      size="large"
                      max={5}
                    />
                    <Box sx={{ mt: 1, display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="caption" color="textSecondary">
                        Não atende às expectativas
                      </Typography>
                      <Typography variant="caption" color="textSecondary">
                        Supera as expectativas
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Box>
        )}

        {activeStep === 1 && (
          <Box>
            <Typography variant="h6" gutterBottom>
              Revise suas respostas
            </Typography>
            {criterios.map((criterio) => (
              <Card key={criterio.id} sx={{ mb: 2 }}>
                <CardContent>
                  <Typography variant="subtitle1">
                    {criterio.nome_criterio}
                  </Typography>
                  <Rating
                    value={respostas[criterio.id] || 0}
                    readOnly
                    size="small"
                  />
                </CardContent>
              </Card>
            ))}
          </Box>
        )}

        {activeStep === 2 && (
          <Box textAlign="center">
            <Typography variant="h6" gutterBottom>
              Avaliação Concluída!
            </Typography>
            <Typography color="textSecondary">
              Suas respostas foram registradas com sucesso.
            </Typography>
          </Box>
        )}

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
          <Button
            onClick={handleBack}
            disabled={activeStep === 0}
          >
            Voltar
          </Button>
          {activeStep === steps.length - 1 ? (
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
            >
              Finalizar
            </Button>
          ) : (
            <Button
              variant="contained"
              onClick={handleNext}
              disabled={activeStep === 1 && Object.keys(respostas).length < criterios.length}
            >
              Próximo
            </Button>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default MSFormsStyleEvaluation;

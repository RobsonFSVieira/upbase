import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Stepper,
  Step,
  StepLabel,
  CircularProgress,
  Alert,
  Slider
} from '@mui/material';
import { performanceService } from '../../services/performanceService';

const MSStyleForm = ({ avaliacaoId, isLider, onComplete, isNew = false }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [criterios, setCriterios] = useState([]);
  const [respostas, setRespostas] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const carregarCriterios = async () => {
      try {
        setLoading(true);
        const tipoCriterios = isLider ? 'lider' : 'ambos';
        const data = await performanceService.getCriterios(tipoCriterios);
        setCriterios(data);
        
        // Se não for nova avaliação, carregar respostas existentes
        if (!isNew && avaliacaoId) {
          const avaliacaoExistente = await performanceService.getById(avaliacaoId);
          if (avaliacaoExistente?.respostas) {
            setRespostas(avaliacaoExistente.respostas);
          }
        }
      } catch (err) {
        setError('Erro ao carregar critérios');
      } finally {
        setLoading(false);
      }
    };

    carregarCriterios();
  }, [isLider, avaliacaoId, isNew]);

  const handleRating = (criterioId, value) => {
    setRespostas(prev => ({
      ...prev,
      [criterioId]: value
    }));
  };

  const handleNext = () => {
    if (activeStep === steps.length - 2) {
      onComplete(respostas);
    } else {
      setActiveStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    setActiveStep(prev => prev - 1);
  };

  const steps = ['Avaliação', 'Revisão', 'Conclusão'];

  const getRatingColor = (value) => {
    if (!value) return 'default';
    if (value <= 4.9) return 'error';
    if (value <= 6.9) return 'warning';
    if (value === 7.0) return 'info';
    return 'success';
  };

  const getRatingLabel = (value) => {
    if (!value) return 'Não avaliado';
    if (value <= 4.9) return 'Baixo Desempenho';
    if (value <= 6.9) return 'Desempenho Regular';
    if (value === 7.0) return 'Desempenho Médio';
    return 'Excelente Desempenho';
  };

  const RatingField = ({ value, onChange, readOnly }) => (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
        <Typography variant="caption" sx={{ mr: 2 }}>
          {getRatingLabel(value)}
        </Typography>
        <Typography 
          variant="h6" 
          color={`${getRatingColor(value)}.main`}
        >
          {value || '-'}
        </Typography>
      </Box>
      {!readOnly && (
        <Slider
          value={value || 0}
          onChange={(_, newValue) => onChange(newValue)}
          min={1}
          max={10}
          step={0.1}
          marks={[
            { value: 1, label: '1' },
            { value: 4.9, label: '4.9' },
            { value: 7, label: '7' },
            { value: 10, label: '10' }
          ]}
          valueLabelDisplay="auto"
        />
      )}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
        <Typography variant="caption" color="error">Baixo</Typography>
        <Typography variant="caption" color="warning.main">Regular</Typography>
        <Typography variant="caption" color="info.main">Médio</Typography>
        <Typography variant="caption" color="success.main">Excelente</Typography>
      </Box>
    </Box>
  );

  if (loading) {
    return <Box display="flex" justifyContent="center"><CircularProgress /></Box>;
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  return (
    <Box>
      <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Box>
        {activeStep === 0 && (
          <Box>
            {criterios.map((criterio) => (
              <Card key={criterio.id} sx={{ mb: 3 }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {criterio.nome_criterio}
                  </Typography>
                  <Typography color="textSecondary" paragraph>
                    {criterio.descricao_criterio}
                  </Typography>
                  <Box sx={{ mt: 2 }}>
                    <RatingField
                      value={respostas[criterio.id]}
                      onChange={(value) => handleRating(criterio.id, value)}
                      readOnly={false}
                    />
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Box>
        )}

        {activeStep === 1 && (
          <Box>
            <Typography variant="h6" gutterBottom>Revise suas respostas:</Typography>
            {criterios.map((criterio) => (
              <Box key={criterio.id} sx={{ mb: 2 }}>
                <Typography variant="subtitle1">{criterio.nome_criterio}</Typography>
                <RatingField
                  value={respostas[criterio.id]}
                  onChange={() => {}}
                  readOnly={true}
                />
              </Box>
            ))}
          </Box>
        )}

        {activeStep === 2 && (
          <Box textAlign="center">
            <Typography variant="h6" color="primary" gutterBottom>
              Avaliação Concluída!
            </Typography>
            <Typography>
              Suas respostas foram registradas com sucesso.
            </Typography>
          </Box>
        )}

        {activeStep !== steps.length - 1 && (
          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between' }}>
            <Button 
              onClick={handleBack}
              disabled={activeStep === 0}
            >
              Voltar
            </Button>
            <Button
              variant="contained"
              onClick={handleNext}
              disabled={activeStep === 0 && Object.keys(respostas).length < criterios.length}
            >
              {activeStep === steps.length - 2 ? 'Concluir' : 'Próximo'}
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default MSStyleForm;

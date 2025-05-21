import React, { useState } from 'react';
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  Paper
} from '@mui/material';
import { 
  NavigateNext as NextIcon,
  NavigateBefore as BackIcon,
  Save as SaveIcon
} from '@mui/icons-material';
import { useNotification } from '../../../contexts/NotificationContext';

import FormularioAutoAvaliacao from './FormularioAutoAvaliacao';
import FormularioAvaliacaoPares from './FormularioAvaliacaoPares';
import RevisaoAvaliacao from './RevisaoAvaliacao';

export default function AvaliacaoPaginada({ onSave, onComplete }) {
  const { showNotification } = useNotification();
  const [activeStep, setActiveStep] = useState(0);
  const [data, setData] = useState({
    autoAvaliacao: {},
    avaliacaoPares: {}
  });

  const steps = [
    'Autoavaliação',
    'Avaliação dos Pares',
    'Revisão da Avaliação',
    'Conclusão'
  ];

  const validateStep = (step) => {
    switch (step) {
      case 0:
        return Object.keys(data.autoAvaliacao).length >= 4; // Todos os critérios preenchidos
      case 1:
        return Object.keys(data.avaliacaoPares).length > 0; // Pelo menos um colega avaliado
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (!validateStep(activeStep)) {
      showNotification({
        message: 'Por favor, preencha todos os campos obrigatórios',
        type: 'warning'
      });
      return;
    }
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const handleSave = () => {
    onSave(data);
    showNotification({
      message: 'Avaliação salva com sucesso',
      type: 'success'
    });
  };

  const handleComplete = () => {
    onComplete();
    showNotification({
      message: 'Avaliação concluída com sucesso',
      type: 'success'
    });
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return <FormularioAutoAvaliacao data={data.autoAvaliacao} setData={setData} />;
      case 1:
        return <FormularioAvaliacaoPares data={data.avaliacaoPares} setData={setData} />;
      case 2:
        return <RevisaoAvaliacao data={data} />;
      case 3:
        return (
          <Box>
            <Typography variant="h6">Obrigado por completar a avaliação!</Typography>
            <Button variant="contained" onClick={handleComplete}>
              Concluir
            </Button>
          </Box>
        );
      default:
        return 'Passo desconhecido';
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Paper elevation={3} sx={{ padding: 3 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Avaliação Paginada
        </Typography>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <Box sx={{ mt: 2, mb: 2 }}>
          {renderStepContent(activeStep)}
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
          <Button
            disabled={activeStep === 0}
            onClick={handleBack}
            sx={{ mr: 1 }}
            startIcon={<BackIcon />}
          >
            Voltar
          </Button>
          <Box sx={{ flex: '1 1 auto' }} />
          {activeStep === steps.length - 1 ? (
            <Button
              variant="contained"
              onClick={handleSave}
              startIcon={<SaveIcon />}
            >
              Salvar
            </Button>
          ) : (
            <Button
              variant="contained"
              onClick={handleNext}
              endIcon={<NextIcon />}
            >
              Próximo
            </Button>
          )}
        </Box>
      </Paper>
    </Box>
  );
}

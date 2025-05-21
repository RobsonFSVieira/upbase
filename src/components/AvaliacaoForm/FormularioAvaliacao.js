import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Stepper,
  Step,
  StepLabel,
  Button,
  Rating,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  TextField,
  Divider,
  Card,
  CardContent,
  Grid,
  CircularProgress,
  Alert,
  LinearProgress
} from '@mui/material';
import {
  NavigateNext as NextIcon,
  NavigateBefore as BackIcon,
  Check as CheckIcon,
  Save as SaveIcon
} from '@mui/icons-material';
import { performanceService } from '../../services/performanceService';

const FormularioAvaliacao = ({ avaliacaoId, colaboradorId, isLider = false }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    criterioslider: {},
    criterioscolaborador: {},
    comentariosGerais: ''
  });
  const [avaliacao, setAvaliacao] = useState(null);
  const [criterios, setCriterios] = useState([]);
  
  // Similar ao Microsoft Forms, organizamos os critérios em seções
  const [secoes, setSecoes] = useState([
    { titulo: "Critérios do Líder", tipo: "criterioslider", visivel: isLider },
    { titulo: "Critérios do Colaborador", tipo: "criterioscolaborador", visivel: true },
    { titulo: "Comentários Gerais", tipo: "comentarios", visivel: true },
    { titulo: "Revisão", tipo: "revisao", visivel: true }
  ]);

  // Filtra seções visíveis baseado no perfil (líder ou colaborador)
  const secoesVisiveis = secoes.filter(secao => secao.visivel);
  
  useEffect(() => {
    const carregarDados = async () => {
      try {
        setLoading(true);
        
        // Em uma implementação real, buscaríamos os dados do backend
        // Aqui usando dados mockados do performanceService
        
        // Obter critérios para o formulário
        const todosCriterios = await performanceService.getCriterios();
        setCriterios(todosCriterios);
        
        // Se for editar uma avaliação existente
        if (avaliacaoId) {
          const dadosAvaliacao = await performanceService.getById(avaliacaoId);
          setAvaliacao(dadosAvaliacao);
          
          // Preencher os dados do formulário com as respostas existentes
          const respostas = {};
          const respostasPares = {};
          
          // Simular preenchimento baseado em dados existentes
          // Na implementação real, mapearíamos os dados da avaliação para os campos do formulário
        }
        
      } catch (err) {
        console.error('Erro ao carregar dados da avaliação:', err);
        setError('Ocorreu um erro ao carregar os dados do formulário. Por favor, tente novamente.');
      } finally {
        setLoading(false);
      }
    };
    
    carregarDados();
  }, [avaliacaoId, colaboradorId, isLider]);

  const handleNext = () => {
    // Validar o passo atual antes de avançar
    if (validarPassoAtual()) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      window.scrollTo(0, 0);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    window.scrollTo(0, 0);
  };

  const validarPassoAtual = () => {
    // Implementar validação específica para cada seção
    const secaoAtual = secoesVisiveis[activeStep];
    
    // Exemplo simples de validação
    if (secaoAtual.tipo === "criterioslider" || secaoAtual.tipo === "criterioscolaborador") {
      // Verificar se todos os critérios obrigatórios foram respondidos
      const criteriosDesseGrupo = criterios.filter(c => 
        secaoAtual.tipo === "criterioslider" 
          ? c.origem_preenchimento_padrao === "lider"
          : c.origem_preenchimento_padrao === "ambos"
      );
      
      for (const criterio of criteriosDesseGrupo) {
        if (criterio.obrigatorio && !formData[secaoAtual.tipo][criterio.id]) {
          setError(`Por favor, avalie o critério "${criterio.nome_criterio}".`);
          return false;
        }
      }
    }
    
    setError(null);
    return true;
  };

  const handleSave = async (finalizar = false) => {
    try {
      setSaving(true);
      
      // Estruturar dados para salvar
      const dadosParaSalvar = {
        id_colaborador_avaliado: colaboradorId,
        respostas: []
      };

      // Preparar respostas do líder
      Object.entries(formData.criterioslider).forEach(([criterioId, valor]) => {
        dadosParaSalvar.respostas.push({
          id_criterio: parseInt(criterioId),
          resposta_lider_escala: valor,
          peso_aplicado_lider: criterios.find(c => c.id === parseInt(criterioId))?.peso_padrao || 1.0
        });
      });

      // Preparar respostas do colaborador
      Object.entries(formData.criterioscolaborador).forEach(([criterioId, valor]) => {
        // Encontrar se já existe resposta para este critério
        const respostaExistente = dadosParaSalvar.respostas.find(
          r => r.id_criterio === parseInt(criterioId)
        );
        
        if (respostaExistente) {
          respostaExistente.resposta_autoavaliacao_escala = valor;
        } else {
          dadosParaSalvar.respostas.push({
            id_criterio: parseInt(criterioId),
            resposta_autoavaliacao_escala: valor
          });
        }
      });
      
      // Adicionar comentários gerais
      if (isLider) {
        dadosParaSalvar.comentarios_gerais_lider = formData.comentariosGerais;
      } else {
        dadosParaSalvar.comentarios_gerais_autoavaliacao = formData.comentariosGerais;
      }
      
      // Status baseado em quem está finalizando e se é para finalizar
      if (finalizar) {
        dadosParaSalvar.status_avaliacao = isLider ? "concluida" : "pendente_lider";
      } else {
        dadosParaSalvar.status_avaliacao = isLider ? "em_revisao_lider" : "pendente_autoavaliacao";
      }
      
      // Salvar dados via serviço
      if (avaliacaoId) {
        await performanceService.update(avaliacaoId, dadosParaSalvar);
      } else {
        await performanceService.create(dadosParaSalvar);
      }
      
      // Exibir feedback de sucesso (em uma implementação real usaria um toast/snackbar)
      alert(finalizar ? "Avaliação concluída com sucesso!" : "Avaliação salva com sucesso!");
      
    } catch (err) {
      console.error('Erro ao salvar avaliação:', err);
      setError('Ocorreu um erro ao salvar os dados. Por favor, tente novamente.');
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (secaoTipo, criterioId, valor) => {
    setFormData(prevData => ({
      ...prevData,
      [secaoTipo]: {
        ...prevData[secaoTipo],
        [criterioId]: valor
      }
    }));
  };

  const handleChangeComentario = (valor) => {
    setFormData(prevData => ({
      ...prevData,
      comentariosGerais: valor
    }));
  };

  const renderCriterioAvaliacao = (criterio, tipo) => {
    const valorAtual = formData[tipo][criterio.id] || 0;
    
    return (
      <Card variant="outlined" sx={{ mb: 3 }} key={criterio.id}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            {criterio.nome_criterio}
          </Typography>
          
          <Typography variant="body2" color="text.secondary" paragraph>
            {criterio.descricao_criterio}
          </Typography>
          
          <Box sx={{ my: 2 }}>
            {criterio.tipo_criterio === 'quantitativo_escala' ? (
              <Box>
                <Typography component="legend" gutterBottom>
                  Avaliação (1-5):
                </Typography>
                <Rating
                  name={`rating-${criterio.id}`}
                  value={valorAtual}
                  onChange={(event, newValue) => {
                    handleChange(tipo, criterio.id, newValue);
                  }}
                  size="large"
                  max={5}
                />
                <Box sx={{ mt: 1, display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="caption" color="text.secondary">
                    Não atende às expectativas
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Supera as expectativas
                  </Typography>
                </Box>
              </Box>
            ) : criterio.tipo_criterio === 'qualitativo_texto' ? (
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Sua resposta"
                value={valorAtual || ''}
                onChange={(e) => handleChange(tipo, criterio.id, e.target.value)}
              />
            ) : (
              <FormControl component="fieldset">
                <FormLabel component="legend">Selecione uma opção:</FormLabel>
                <RadioGroup
                  value={valorAtual || ''}
                  onChange={(e) => handleChange(tipo, criterio.id, e.target.value)}
                >
                  <FormControlLabel value="sim" control={<Radio />} label="Sim" />
                  <FormControlLabel value="nao" control={<Radio />} label="Não" />
                  <FormControlLabel value="parcial" control={<Radio />} label="Parcialmente" />
                </RadioGroup>
              </FormControl>
            )}
          </Box>
        </CardContent>
      </Card>
    );
  };

  const renderSecao = (secao, index) => {
    switch (secao.tipo) {
      case 'criterioslider':
        return (
          <>
            <Typography variant="h5" gutterBottom>{secao.titulo}</Typography>
            <Typography variant="body1" paragraph color="text.secondary">
              Avalie os critérios de desempenho relacionados à liderança:
            </Typography>
            {criterios
              .filter(c => c.origem_preenchimento_padrao === 'lider')
              .map(criterio => renderCriterioAvaliacao(criterio, 'criterioslider'))}
          </>
        );
        
      case 'criterioscolaborador':
        return (
          <>
            <Typography variant="h5" gutterBottom>{secao.titulo}</Typography>
            <Typography variant="body1" paragraph color="text.secondary">
              Avalie os critérios de desempenho relacionados ao colaborador:
            </Typography>
            {criterios
              .filter(c => c.origem_preenchimento_padrao === 'ambos')
              .map(criterio => renderCriterioAvaliacao(criterio, 'criterioscolaborador'))}
          </>
        );
        
      case 'comentarios':
        return (
          <>
            <Typography variant="h5" gutterBottom>{secao.titulo}</Typography>
            <Typography variant="body1" paragraph color="text.secondary">
              Adicione comentários gerais sobre o desempenho:
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={6}
              label="Comentários"
              value={formData.comentariosGerais || ''}
              onChange={(e) => handleChangeComentario(e.target.value)}
              sx={{ mb: 2 }}
            />
          </>
        );
        
      case 'revisao':
        return (
          <>
            <Typography variant="h5" gutterBottom>{secao.titulo}</Typography>
            <Typography variant="body1" paragraph color="text.secondary">
              Revise suas respostas antes de finalizar:
            </Typography>
            
            {isLider && (
              <>
                <Typography variant="h6" gutterBottom>Avaliação do Líder</Typography>
                {renderRespostas('criterioslider')}
                <Divider sx={{ my: 2 }} />
              </>
            )}
            
            <Typography variant="h6" gutterBottom>Avaliação do Colaborador</Typography>
            {renderRespostas('criterioscolaborador')}
            
            <Divider sx={{ my: 2 }} />
            
            <Typography variant="h6" gutterBottom>Comentários Gerais</Typography>
            <Paper variant="outlined" sx={{ p: 2, mb: 2 }}>
              <Typography>
                {formData.comentariosGerais || 'Nenhum comentário adicionado.'}
              </Typography>
            </Paper>
          </>
        );
        
      default:
        return null;
    }
  };

  const renderRespostas = (tipo) => {
    const criteriosFiltrados = criterios.filter(c => 
      tipo === 'criterioslider' 
        ? c.origem_preenchimento_padrao === 'lider'
        : c.origem_preenchimento_padrao === 'ambos'
    );
    
    if (Object.keys(formData[tipo]).length === 0) {
      return <Alert severity="info">Nenhuma resposta fornecida nesta seção.</Alert>;
    }
    
    return (
      <Grid container spacing={2}>
        {criteriosFiltrados.map(criterio => {
          const valor = formData[tipo][criterio.id];
          if (!valor) return null;
          
          return (
            <Grid item xs={12} md={6} key={criterio.id}>
              <Paper variant="outlined" sx={{ p: 2 }}>
                <Typography variant="subtitle1" fontWeight="bold">
                  {criterio.nome_criterio}
                </Typography>
                
                {criterio.tipo_criterio === 'quantitativo_escala' ? (
                  <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                    <Rating value={valor} readOnly />
                    <Typography sx={{ ml: 1 }}>({valor}/5)</Typography>
                  </Box>
                ) : (
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    {valor}
                  </Typography>
                )}
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    );
  };

  if (loading) {
    return (
      <Box sx={{ width: '100%' }}>
        <LinearProgress />
        <Typography sx={{ mt: 2, textAlign: 'center' }}>
          Carregando formulário de avaliação...
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ width: '100%' }}>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}
      
      <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
        <Typography variant="h4" align="center" gutterBottom>
          {isLider ? 'Avaliação de Desempenho (Líder)' : 'Autoavaliação de Desempenho'}
        </Typography>
        
        <Typography variant="subtitle1" align="center" color="text.secondary" paragraph>
          {avaliacao?.period || 'Período atual'} • {avaliacao?.employeeName || 'Colaborador'}
        </Typography>
        
        <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4, mt: 3 }}>
          {secoesVisiveis.map((secao) => (
            <Step key={secao.tipo}>
              <StepLabel>{secao.titulo}</StepLabel>
            </Step>
          ))}
        </Stepper>
        
        <Box sx={{ mt: 4, mb: 2 }}>
          {renderSecao(secoesVisiveis[activeStep], activeStep)}
        </Box>
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', pt: 2 }}>
          <Button
            color="inherit"
            disabled={activeStep === 0 || saving}
            onClick={handleBack}
            startIcon={<BackIcon />}
          >
            Anterior
          </Button>
          
          <Box>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => handleSave(false)}
              disabled={saving}
              sx={{ mr: 1 }}
            >
              {saving ? <CircularProgress size={24} /> : 'Salvar Rascunho'}
            </Button>
            
            {activeStep === secoesVisiveis.length - 1 ? (
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleSave(true)}
                disabled={saving}
                endIcon={<CheckIcon />}
              >
                {saving ? <CircularProgress size={24} /> : 'Finalizar'}
              </Button>
            ) : (
              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
                disabled={saving}
                endIcon={<NextIcon />}
              >
                Próximo
              </Button>
            )}
          </Box>
        </Box>
      </Paper>
      
      <Box sx={{ mt: 2, mb: 2, display: 'flex', justifyContent: 'center' }}>
        <Typography variant="body2" color="text.secondary">
          Upbase • Sistema de Avaliação de Desempenho • {new Date().getFullYear()}
        </Typography>
      </Box>
    </Box>
  );
};

export default FormularioAvaliacao;

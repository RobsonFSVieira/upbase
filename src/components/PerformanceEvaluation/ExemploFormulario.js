import React, { useState } from 'react';
import {
  Box,
  Card,
  Typography,
  LinearProgress,
  Radio,
  RadioGroup,
  FormControlLabel,
  TextField,
  Rating,
  Button,
  Checkbox,
  FormGroup,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';

// Dados fictícios de exemplo
const exemploFormulario = {
  titulo: "Avaliação de Desempenho - 2º Trimestre 2025",
  descricao: "Por favor, avalie o desempenho do colaborador nos seguintes aspectos:",
  progresso: 0,
  questoes: [
    {
      id: 1,
      tipo: "rating",
      titulo: "Qualidade do Trabalho",
      descricao: "Como você avalia a qualidade geral do trabalho entregue?",
      obrigatorio: true,
      labels: {
        baixo: "Precisa melhorar",
        alto: "Excelente"
      }
    },
    {
      id: 2,
      tipo: "multipla_escolha",
      titulo: "Cumprimento de Prazos",
      descricao: "Com que frequência os prazos são cumpridos?",
      opcoes: [
        "Sempre cumpre os prazos",
        "Geralmente cumpre os prazos",
        "Às vezes atrasa",
        "Frequentemente atrasa"
      ],
      obrigatorio: true
    },
    {
      id: 3,
      tipo: "texto",
      titulo: "Pontos Fortes",
      descricao: "Descreva os principais pontos fortes do colaborador",
      obrigatorio: true,
      placeholder: "Digite aqui os pontos fortes observados..."
    },
    {
      id: 4,
      tipo: "checkbox",
      titulo: "Competências Demonstradas",
      descricao: "Selecione as competências que o colaborador demonstrou neste período:",
      opcoes: [
        "Trabalho em equipe",
        "Comunicação efetiva",
        "Resolução de problemas",
        "Proatividade",
        "Liderança"
      ],
      obrigatorio: true
    },
    {
      id: 5,
      tipo: "select",
      titulo: "Nível de Autonomia",
      descricao: "Qual o nível de autonomia demonstrado pelo colaborador?",
      opcoes: [
        "Precisa de supervisão constante",
        "Precisa de supervisão ocasional",
        "Trabalha com autonomia na maioria das tarefas",
        "Totalmente autônomo"
      ],
      obrigatorio: true
    }
  ]
};

const ExemploFormulario = () => {
  const [questaoAtual, setQuestaoAtual] = useState(0);
  const [respostas, setRespostas] = useState({});
  
  const handleResposta = (id, valor) => {
    setRespostas(prev => ({
      ...prev,
      [id]: valor
    }));
  };

  const proximaQuestao = () => {
    if (questaoAtual < exemploFormulario.questoes.length - 1) {
      setQuestaoAtual(prev => prev + 1);
    }
  };

  const questaoAnterior = () => {
    if (questaoAtual > 0) {
      setQuestaoAtual(prev => prev - 1);
    }
  };

  const renderQuestao = (questao) => {
    switch (questao.tipo) {
      case 'rating':
        return (
          <Box sx={{ textAlign: 'center', mt: 3 }}>
            <Rating
              value={respostas[questao.id] || 0}
              onChange={(_, value) => handleResposta(questao.id, value)}
              size="large"
              max={5}
            />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
              <Typography variant="caption" color="text.secondary">
                {questao.labels.baixo}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {questao.labels.alto}
              </Typography>
            </Box>
          </Box>
        );

      case 'multipla_escolha':
        return (
          <RadioGroup
            value={respostas[questao.id] || ''}
            onChange={(e) => handleResposta(questao.id, e.target.value)}
          >
            {questao.opcoes.map((opcao, index) => (
              <FormControlLabel
                key={index}
                value={opcao}
                control={<Radio />}
                label={opcao}
                sx={{ my: 1 }}
              />
            ))}
          </RadioGroup>
        );

      case 'texto':
        return (
          <TextField
            fullWidth
            multiline
            rows={4}
            value={respostas[questao.id] || ''}
            onChange={(e) => handleResposta(questao.id, e.target.value)}
            placeholder={questao.placeholder}
            sx={{ mt: 2 }}
          />
        );

      case 'checkbox':
        return (
          <FormGroup>
            {questao.opcoes.map((opcao, index) => (
              <FormControlLabel
                key={index}
                control={
                  <Checkbox
                    checked={respostas[questao.id]?.includes(opcao) || false}
                    onChange={(e) => {
                      const atual = respostas[questao.id] || [];
                      if (e.target.checked) {
                        handleResposta(questao.id, [...atual, opcao]);
                      } else {
                        handleResposta(questao.id, atual.filter(item => item !== opcao));
                      }
                    }}
                  />
                }
                label={opcao}
              />
            ))}
          </FormGroup>
        );

      case 'select':
        return (
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel>Selecione uma opção</InputLabel>
            <Select
              value={respostas[questao.id] || ''}
              onChange={(e) => handleResposta(questao.id, e.target.value)}
              label="Selecione uma opção"
            >
              {questao.opcoes.map((opcao, index) => (
                <MenuItem key={index} value={opcao}>
                  {opcao}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        );

      default:
        return null;
    }
  };

  const questaoAtualObj = exemploFormulario.questoes[questaoAtual];
  const progresso = ((questaoAtual + 1) / exemploFormulario.questoes.length) * 100;

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', p: 3 }}>
      <Card sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom align="center" sx={{ color: '#1976d2' }}>
          {exemploFormulario.titulo}
        </Typography>
        
        <Typography variant="body1" sx={{ mb: 4 }} align="center" color="text.secondary">
          {exemploFormulario.descricao}
        </Typography>

        <LinearProgress 
          variant="determinate" 
          value={progresso} 
          sx={{ mb: 4, height: 8, borderRadius: 4 }}
        />

        <Typography variant="h6" gutterBottom>
          {questaoAtualObj.titulo}
        </Typography>
        
        <Typography variant="body2" color="text.secondary" paragraph>
          {questaoAtualObj.descricao}
        </Typography>

        {renderQuestao(questaoAtualObj)}

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
          <Button
            onClick={questaoAnterior}
            disabled={questaoAtual === 0}
            variant="outlined"
          >
            Anterior
          </Button>
          
          {questaoAtual === exemploFormulario.questoes.length - 1 ? (
            <Button
              variant="contained"
              color="primary"
              onClick={() => console.log('Formulário enviado:', respostas)}
            >
              Concluir
            </Button>
          ) : (
            <Button
              onClick={proximaQuestao}
              variant="contained"
              disabled={!respostas[questaoAtualObj.id] && questaoAtualObj.obrigatorio}
            >
              Próxima
            </Button>
          )}
        </Box>
      </Card>
    </Box>
  );
};

export default ExemploFormulario;

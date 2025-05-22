import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Alert,
  CircularProgress,
  Paper,
} from '@mui/material';
import MSStyleForm from '../../../../components/PerformanceEvaluation/MSStyleForm';
import { performanceService } from '../../../../services/performanceService';

const AvaliarDesempenho = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [avaliacaoData, setAvaliacaoData] = useState(null);
  const [userProfile, setUserProfile] = useState(null);

  // Simular carregamento do perfil de usuário (em produção viria do contexto de auth)
  useEffect(() => {
    // Em produção, este dado viria da autenticação
    setUserProfile({
      id: 'user123',
      role: 'lider' // ou 'colaborador'
    });
  }, []);

  useEffect(() => {
    const carregarAvaliacao = async () => {
      if (!id || id === 'new') {
        setLoading(false);
        return;
      }
      
      try {
        setLoading(true);
        setError(null);
        
        const avaliacao = await performanceService.getById(id);
        if (!avaliacao) {
          setError('Avaliação não encontrada');
          return;
        }
        
        setAvaliacaoData(avaliacao);
      } catch (err) {
        console.error('Erro ao carregar avaliação:', err);
        setError('Ocorreu um erro ao carregar os dados da avaliação');
      } finally {
        setLoading(false);
      }
    };
    
    carregarAvaliacao();
  }, [id]);

  const handleComplete = async (respostas) => {
    try {
      // Em um cenário real, você enviaria as respostas para a API
      console.log('Avaliação concluída:', respostas);
      
      // Simular um delay de API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Redirecionar após um pequeno delay para mostrar mensagem de sucesso
      setTimeout(() => {
        navigate('/avaliacoes/desempenho');
      }, 3000);
      
    } catch (err) {
      console.error('Erro ao processar avaliação:', err);
      setError('Ocorreu um erro ao processar a avaliação');
    }
  };

  if (loading || !userProfile) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="400px">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ my: 3 }}>
        {error}
      </Alert>
    );
  }

  const isLider = userProfile.role === 'lider';

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h5" fontWeight="bold" gutterBottom color="primary">
        {isLider 
          ? (id === 'new' ? 'Nova Avaliação de Desempenho' : 'Avaliação de Desempenho - Líder')
          : (id === 'new' ? 'Nova Autoavaliação' : 'Autoavaliação de Desempenho')
        }
      </Typography>

      {loading ? (
        <Box display="flex" justifyContent="center" p={4}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : (
        <MSStyleForm
          avaliacaoId={id === 'new' ? null : id}
          isLider={isLider}
          onComplete={handleComplete}
          isNew={id === 'new'}
        />
      )}
    </Paper>
  );
};

export default AvaliarDesempenho;

//# sourceMappingURL=index.js.map
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Paper,
  Button,
  CircularProgress,
  Alert,
  Breadcrumbs,
  Link as MuiLink
} from '@mui/material';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import FormularioAvaliacao from '../../components/AvaliacaoForm/FormularioAvaliacao';
import { useAvaliacao } from '../../contexts/AvaliacaoContext';
import { performanceService } from '../../services/performanceService';

const RealizarAvaliacao = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser, recarregarAvaliacoes } = useAvaliacao();
  const [avaliacao, setAvaliacao] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const carregarAvaliacao = async () => {
      try {
        setLoading(true);
        setError(null);

        if (id) {
          // Se existe ID, carregar avaliação existente
          const data = await performanceService.getById(id);
          if (!data) {
            setError('Avaliação não encontrada.');
            return;
          }
          setAvaliacao(data);
        } else {
          // Se não existe ID, estamos em uma nova avaliação
          // Em uma implementação real, verificaríamos permissões,
          // e possivelmente pré-carregaríamos dados do colaborador a ser avaliado
          setAvaliacao({
            tipo: 'nova'
          });
        }
      } catch (err) {
        console.error('Erro ao carregar avaliação:', err);
        setError('Ocorreu um erro ao carregar os dados da avaliação.');
      } finally {
        setLoading(false);
      }
    };

    carregarAvaliacao();
  }, [id]);

  const handleVoltar = () => {
    navigate('/avaliacoes/desempenho');
  };

  const isLider = currentUser?.perfil === 'lider';

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="80vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg">
        <Alert severity="error" sx={{ mt: 4 }}>
          {error}
        </Alert>
        <Box display="flex" justifyContent="center" mt={2}>
          <Button
            variant="contained"
            startIcon={<ArrowBackIcon />}
            onClick={handleVoltar}
          >
            Voltar para Avaliações
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Breadcrumbs sx={{ mb: 2 }}>
          <MuiLink component={Button} onClick={handleVoltar} underline="hover" color="inherit">
            Avaliações
          </MuiLink>
          <MuiLink component={Button} onClick={handleVoltar} underline="hover" color="inherit">
            Desempenho
          </MuiLink>
          <Typography color="text.primary">
            {id ? 'Editar Avaliação' : 'Nova Avaliação'}
          </Typography>
        </Breadcrumbs>
        
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={handleVoltar}
          sx={{ mb: 3 }}
        >
          Voltar para Lista
        </Button>
        
        <FormularioAvaliacao 
          avaliacaoId={id}
          colaboradorId={avaliacao?.id_colaborador_avaliado || ''}
          isLider={isLider}
        />
      </Box>
    </Container>
  );
};

export default RealizarAvaliacao;

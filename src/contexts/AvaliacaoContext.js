import React, { createContext, useContext, useState, useEffect } from 'react';
import { performanceService } from '../services/performanceService';

const AvaliacaoContext = createContext();

export const useAvaliacao = () => useContext(AvaliacaoContext);

export const AvaliacaoProvider = ({ children }) => {
  const [avaliacoesPendentes, setAvaliacoesPendentes] = useState([]);
  const [avaliacoesCompletas, setAvaliacoesCompletas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  // Simulando um usuário logado (em produção, viria do contexto de autenticação)
  useEffect(() => {
    // Em uma implementação real, isso viria do serviço de autenticação
    setCurrentUser({
      id: 'user123',
      nome: 'Usuário Teste',
      perfil: 'lider', // ou 'colaborador'
      turno: 'A'
    });
  }, []);

  const carregarAvaliacoes = async () => {
    if (!currentUser) return;
    
    try {
      setLoading(true);
      setError(null);

      // Em um cenário real, estas chamadas seriam filtradas por usuário
      if (currentUser.perfil === 'lider') {
        // Buscar avaliações que o líder precisa completar
        const pendentes = await performanceService.getAvaliacoesPendentes(currentUser.id);
        setAvaliacoesPendentes(pendentes);
      } else {
        // Buscar autoavaliações pendentes para o colaborador
        const pendentes = await performanceService.getAvaliacoesCompletar(currentUser.id);
        setAvaliacoesPendentes(pendentes);
      }

      // Buscar avaliações já completadas (para histórico)
      // Implementação futura...

    } catch (error) {
      console.error('Erro ao carregar avaliações:', error);
      setError('Não foi possível carregar as avaliações. Por favor, tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (currentUser) {
      carregarAvaliacoes();
    }
  }, [currentUser]);

  const value = {
    avaliacoesPendentes,
    avaliacoesCompletas,
    loading,
    error,
    currentUser,
    recarregarAvaliacoes: carregarAvaliacoes
  };

  return (
    <AvaliacaoContext.Provider value={value}>
      {children}
    </AvaliacaoContext.Provider>
  );
};

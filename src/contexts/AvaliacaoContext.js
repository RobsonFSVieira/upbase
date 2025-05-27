import React, { createContext, useContext, useState, useEffect } from 'react';
import { mockData } from '../services/mockData';

const AvaliacaoContext = createContext();

export const useAvaliacao = () => {
  const context = useContext(AvaliacaoContext);
  if (context === undefined) {
    throw new Error('useAvaliacao deve ser usado dentro de um AvaliacaoProvider');
  }
  return context;
};

export const AvaliacaoProvider = ({ children }) => {
  const [avaliacoesPendentes, setAvaliacoesPendentes] = useState(mockData.avaliacoes?.pendentes || []);
  const [avaliacoesEmAndamento, setAvaliacoesEmAndamento] = useState(mockData.avaliacoes?.emAndamento || []);
  const [dashboardStats, setDashboardStats] = useState(mockData.dashboardStats || {
    avaliacoesPendentes: 0,
    avaliacoesUrgentes: 0,
    totalColaboradores: 0,
    feedbacksMes: 0,
    taxaCrescimento: '0%',
    mediaAvaliacoes: 0,
    ultimosResultados: [],
    feedbacksRecentes: []
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentUser, setCurrentUser] = useState({
    id: 'user123',
    nome: 'Usuário Teste',
    perfil: 'lider',
    turno: 'A'
  });

  useEffect(() => {
    console.log('AvaliacaoContext Initialized with:', {
      avaliacoesPendentes,
      avaliacoesEmAndamento,
      dashboardStats
    });
  }, [avaliacoesPendentes, avaliacoesEmAndamento, dashboardStats]);

  const value = {
    avaliacoesPendentes,
    avaliacoesEmAndamento,
    dashboardStats,
    loading,
    error,
    currentUser,
    recarregarAvaliacoes: async () => {
      try {
        setLoading(true);
        // Aqui você implementaria a lógica real de recarregamento
        // Por enquanto, apenas atualizamos com os dados mock
        setAvaliacoesPendentes(mockData.avaliacoes.pendentes);
        setAvaliacoesEmAndamento(mockData.avaliacoes.emAndamento);
        setDashboardStats(mockData.dashboardStats);
      } catch (err) {
        setError('Erro ao recarregar avaliações');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <AvaliacaoContext.Provider value={value}>
      {children}
    </AvaliacaoContext.Provider>
  );
};

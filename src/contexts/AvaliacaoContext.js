import React, { createContext, useContext, useState, useEffect } from 'react';
import { mockData } from '../services/mockData';

const AvaliacaoContext = createContext();

export const useAvaliacao = () => useContext(AvaliacaoContext);

export const AvaliacaoProvider = ({ children }) => {
  const [avaliacoesPendentes, setAvaliacoesPendentes] = useState(mockData.avaliacoes.pendentes);
  const [avaliacoesEmAndamento, setAvaliacoesEmAndamento] = useState(mockData.avaliacoes.emAndamento);
  const [dashboardStats, setDashboardStats] = useState(mockData.dashboardStats);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentUser, setCurrentUser] = useState({
    id: 'user123',
    nome: 'Usuário Teste',
    perfil: 'lider',
    turno: 'A'
  });

  useEffect(() => {
    // Log initial values
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
    recarregarAvaliacoes: () => {} // função vazia por enquanto
  };

  return (
    <AvaliacaoContext.Provider value={value}>
      {children}
    </AvaliacaoContext.Provider>
  );
};

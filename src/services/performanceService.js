import { supabase } from './supabase';
import { mockData } from './mockData';

// Services that use mock data for development, prepared for future backend integration
export const performanceService = {
  getAvaliacoesCompletar(userId) {
    // Return all pending evaluations that need autoavaliacao
    const avaliacoes = mockData.avaliacoes.pendentes.filter(av => {
      return av.status_avaliacao === "pendente_autoavaliacao";
    });
    return Promise.resolve(avaliacoes);
  },

  getAvaliacoesPendentes(liderId) {
    // Return all pending evaluations that need leader review
    const avaliacoes = mockData.avaliacoes.pendentes.filter(av => {
      return av.status_avaliacao === "pendente_lider";
    });
    return Promise.resolve(avaliacoes);
  },

  criarNovaAvaliacao(dados) {
    // Create new evaluation
    const novaAvaliacao = {
      id: mockData.avaliacoes.pendentes.length + mockData.avaliacoes.emAndamento.length + 1,
      ...dados,
      status_avaliacao: "pendente_autoavaliacao",
      nota_final_calculada: null
    };

    // Add to pending evaluations
    mockData.avaliacoes.pendentes.push(novaAvaliacao);
    return Promise.resolve(novaAvaliacao);
  },

  getAll() {
    // Return all evaluations (pending and in progress)
    const todasAvaliacoes = [
      ...mockData.avaliacoes.pendentes,
      ...mockData.avaliacoes.emAndamento
    ];

    return Promise.resolve(todasAvaliacoes);
  }
};

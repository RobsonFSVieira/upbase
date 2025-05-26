export const mockData = {
  avaliacoes: {
    pendentes: [
      {
        id: 1,
        nome_colaborador: 'João Silva',
        departamento: 'Desenvolvimento',
        periodo: '2024 Q1',
        status_avaliacao: 'pendente_autoavaliacao',
        nota_final_calculada: null
      },
      {
        id: 2,
        nome_colaborador: 'Maria Santos', 
        departamento: 'Marketing',
        periodo: '2024 Q1',
        status_avaliacao: 'pendente_lider',
        nota_final_calculada: null
      }
    ],
    emAndamento: [
      {
        id: 3,
        nome_colaborador: 'Pedro Oliveira',
        departamento: 'RH',
        periodo: '2024 Q1',
        status_avaliacao: 'em_andamento',
        nota_final_calculada: null
      }
    ]
  },  dashboardStats: {
    avaliacoesPendentes: 2,
    avaliacoesUrgentes: 1,
    totalColaboradores: 48,
    feedbacksMes: 5,
    taxaCrescimento: '15%',
    mediaAvaliacoes: 4.2,
    ultimosResultados: [
      { colaborador: 'João Silva', nota: 4.5 },
      { colaborador: 'Maria Santos', nota: 4.2 },
      { colaborador: 'Pedro Oliveira', nota: 4.8 }
    ],
    feedbacksRecentes: [
      { de: 'Carlos Souza', tipo: 'Positivo', data: '2025-05-20' },
      { de: 'Amanda Lima', tipo: 'Construtivo', data: '2025-05-19' },
      { de: 'Roberto Martins', tipo: 'Positivo', data: '2025-05-18' }
    ]
  },
  colaboradores: {
    total: 48,
    ativos: 45,
    porTurno: {
      A: 12, B: 12, C: 12, D: 9, ADM: 3
    },
    lista: [
      {
        id: 1,
        nome: 'João Silva',
        re: '12345',
        turno: 'A',
        cargo: 'Operador I',
        lider: 'Carlos Souza',
        status: 'ativo'
      }
      // ... mais colaboradores
    ]
  }
};

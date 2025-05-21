import { supabase } from './supabase';

// Mock data para desenvolvimento local
const mockCiclos = [
  {
    id: 1,
    nome_ciclo: "Avaliação Semestral 2023.2",
    data_inicio: "2023-07-01",
    data_fim: "2023-12-31",
    status_ciclo: "em_andamento",
    descricao: "Ciclo de avaliação semestral do segundo semestre de 2023"
  },
  {
    id: 2,
    nome_ciclo: "Avaliação Experiência 90 dias - Carlos Santos",
    data_inicio: "2023-09-15",
    data_fim: "2023-12-15",
    status_ciclo: "encerrado",
    descricao: "Avaliação de período de experiência de 90 dias"
  }
];

// Atualizar mock de critérios para refletir os critérios específicos mencionados
const mockCriterios = [
  // Critérios para líderes (peso maior)
  {
    id: 1,
    nome_criterio: "Capacidade de Concentração",
    descricao_criterio: "Capacidade de manter o foco nas tarefas e atividades",
    tipo_criterio: "quantitativo_escala",
    peso_padrao: 1.5, // Peso maior para critérios de líder
    origem_preenchimento_padrao: "lider"
  },
  {
    id: 2,
    nome_criterio: "Tomada de Decisão",
    descricao_criterio: "Habilidade de tomar decisões adequadas em tempo hábil",
    tipo_criterio: "quantitativo_escala",
    peso_padrao: 1.5,
    origem_preenchimento_padrao: "lider"
  },
  {
    id: 3,
    nome_criterio: "Empenho em Aprender",
    descricao_criterio: "Disposição e iniciativa para adquirir novos conhecimentos",
    tipo_criterio: "quantitativo_escala",
    peso_padrao: 1.5,
    origem_preenchimento_padrao: "lider"
  },
  {
    id: 4,
    nome_criterio: "Flexibilidade",
    descricao_criterio: "Capacidade de se adaptar a mudanças e novas situações",
    tipo_criterio: "quantitativo_escala",
    peso_padrao: 1.5,
    origem_preenchimento_padrao: "lider"
  },
  {
    id: 5,
    nome_criterio: "Disponibilidade",
    descricao_criterio: "Disponibilidade para atender demandas e auxiliar a equipe",
    tipo_criterio: "quantitativo_escala",
    peso_padrao: 1.5,
    origem_preenchimento_padrao: "lider"
  },
  {
    id: 6,
    nome_criterio: "Disciplina",
    descricao_criterio: "Cumprimento de regras, horários e metodologias de trabalho",
    tipo_criterio: "quantitativo_escala",
    peso_padrao: 1.5,
    origem_preenchimento_padrao: "lider"
  },
  {
    id: 7,
    nome_criterio: "Engajamento",
    descricao_criterio: "Nível de comprometimento com os objetivos da equipe e empresa",
    tipo_criterio: "quantitativo_escala",
    peso_padrao: 1.5,
    origem_preenchimento_padrao: "lider"
  },
  
  // Critérios para auto-avaliação e avaliação entre pares
  {
    id: 8,
    nome_criterio: "Trabalho em Equipe",
    descricao_criterio: "Capacidade de colaborar efetivamente com os colegas",
    tipo_criterio: "quantitativo_escala",
    peso_padrao: 1.0,
    origem_preenchimento_padrao: "ambos" // Tanto auto-avaliação quanto avaliação por pares
  },
  {
    id: 9,
    nome_criterio: "Sociabilidade",
    descricao_criterio: "Habilidade de interagir e se relacionar profissionalmente com os colegas",
    tipo_criterio: "quantitativo_escala",
    peso_padrao: 1.0,
    origem_preenchimento_padrao: "ambos"
  },
  {
    id: 10,
    nome_criterio: "Proatividade",
    descricao_criterio: "Iniciativa para antecipar problemas e sugerir soluções",
    tipo_criterio: "quantitativo_escala",
    peso_padrao: 1.0,
    origem_preenchimento_padrao: "ambos"
  },
  {
    id: 11,
    nome_criterio: "Autocontrole",
    descricao_criterio: "Capacidade de manter a calma e eficiência sob pressão",
    tipo_criterio: "quantitativo_escala",
    peso_padrao: 1.0,
    origem_preenchimento_padrao: "ambos"
  }
];

// Dados mockados atualizados para incluir os critérios específicos
const mockAvaliacoes = [
  {
    id: 1,
    id_colaborador_avaliado: "user123",
    nome_colaborador: 'João Silva',
    departamento: 'Desenvolvimento',
    id_lider_avaliador: "leader456",
    id_ciclo_avaliacao: 1,
    id_modelo_avaliacao: 1,
    status_avaliacao: "concluida",
    nota_final_calculada: 4.2,
    periodo: "2023 Q3",
    comentarios_gerais_autoavaliacao: "Acredito que evoluí bastante nos aspectos técnicos e de trabalho em equipe",
    comentarios_gerais_lider: "João tem demonstrado excelente desempenho técnico e está evoluindo bem em aspectos de disciplina e engajamento",
    respostas: [
      // Respostas do líder (peso maior)
      { 
        id_criterio: 1, 
        nome_criterio: "Capacidade de Concentração",
        resposta_autoavaliacao_escala: null,
        resposta_lider_escala: 4,
        peso_aplicado_lider: 1.5
      },
      { 
        id_criterio: 4, 
        nome_criterio: "Flexibilidade",
        resposta_autoavaliacao_escala: null,
        resposta_lider_escala: 5,
        peso_aplicado_lider: 1.5
      },
      { 
        id_criterio: 6, 
        nome_criterio: "Disciplina",
        resposta_autoavaliacao_escala: null,
        resposta_lider_escala: 4,
        peso_aplicado_lider: 1.5
      },
      { 
        id_criterio: 7, 
        nome_criterio: "Engajamento",
        resposta_autoavaliacao_escala: null,
        resposta_lider_escala: 4,
        peso_aplicado_lider: 1.5
      },
      
      // Auto-avaliação e avaliação por pares
      { 
        id_criterio: 8, 
        nome_criterio: "Trabalho em Equipe",
        resposta_autoavaliacao_escala: 4,
        resposta_lider_escala: 4,
        peso_aplicado_lider: 1.0
      },
      { 
        id_criterio: 9, 
        nome_criterio: "Sociabilidade",
        resposta_autoavaliacao_escala: 5,
        resposta_lider_escala: 4,
        peso_aplicado_lider: 1.0
      },
      { 
        id_criterio: 10, 
        nome_criterio: "Proatividade",
        resposta_autoavaliacao_escala: 3,
        resposta_lider_escala: 4,
        peso_aplicado_lider: 1.0
      },
      { 
        id_criterio: 11, 
        nome_criterio: "Autocontrole",
        resposta_autoavaliacao_escala: 4,
        resposta_lider_escala: 3,
        peso_aplicado_lider: 1.0
      }
    ]
  },
  {
    id: 2,
    id_colaborador_avaliado: "user456",
    nome_colaborador: 'Maria Oliveira',
    departamento: 'Marketing',
    id_lider_avaliador: "leader123",
    id_ciclo_avaliacao: 1,
    id_modelo_avaliacao: 1,
    status_avaliacao: "pendente_autoavaliacao",
    nota_final_calculada: null,
    periodo: "2023 Q3",
    comentarios_gerais_autoavaliacao: "",
    comentarios_gerais_lider: "",
    respostas: []
  },
  {
    id: 3,
    id_colaborador_avaliado: "user789",
    nome_colaborador: 'Carlos Santos',
    departamento: 'Recursos Humanos',
    id_lider_avaliador: "leader456",
    id_ciclo_avaliacao: 2,
    id_modelo_avaliacao: 1,
    status_avaliacao: "pendente_lider",
    nota_final_calculada: null,
    periodo: "2023 Q4",
    comentarios_gerais_autoavaliacao: "Bom relacionamento interpessoal",
    comentarios_gerais_lider: "Carlos precisa melhorar em alguns aspectos técnicos",
    respostas: [
      { 
        id_criterio: 1, 
        nome_criterio: "Qualidade do Trabalho",
        resposta_autoavaliacao_escala: 3,
        resposta_lider_escala: 2 
      },
      { 
        id_criterio: 2, 
        nome_criterio: "Trabalho em Equipe",
        resposta_autoavaliacao_escala: 4,
        resposta_lider_escala: 3 
      },
      { 
        id_criterio: 3, 
        nome_criterio: "Liderança",
        resposta_autoavaliacao_escala: null,
        resposta_lider_escala: 3 
      },
    ]
  }
];

// Adicionar mock para modelos de avaliação configuráveis
const mockModelosAvaliacao = [
  {
    id: 1,
    nome_modelo: "Avaliação Mensal Padrão",
    descricao: "Modelo padrão para avaliações mensais de desempenho",
    criterios_lider: [1, 2, 3, 4, 5, 6, 7], // IDs dos critérios para líderes
    criterios_auto_pares: [8, 9, 10, 11], // IDs dos critérios para auto-avaliação e entre pares
    ativo: true
  },
  {
    id: 2,
    nome_modelo: "Avaliação de Experiência 90 dias",
    descricao: "Modelo para avaliações de período de experiência",
    criterios_lider: [1, 2, 3, 4, 6, 7], // Sem "Disponibilidade"
    criterios_auto_pares: [8, 9, 10], // Sem "Autocontrole"
    ativo: true
  }
];

// Versão do serviço focada em dados mockados, mas preparada para integração futura
export const performanceService = {
  // Obter ciclos de avaliação
  getCiclos() {
    return Promise.resolve([...mockCiclos]);
  },

  // Obter critérios de avaliação
  getCriterios(filtro = null) {
    if (!filtro) {
      return Promise.resolve([...mockCriterios]);
    }
    
    // Filtrar critérios por origem (lider, ambos, etc)
    return Promise.resolve(
      mockCriterios.filter(criterio => 
        criterio.origem_preenchimento_padrao === filtro || 
        criterio.origem_preenchimento_padrao === 'ambos'
      )
    );
  },
  
  // Obter modelos de avaliação
  getModelosAvaliacao() {
    return Promise.resolve([...mockModelosAvaliacao]);
  },
  
  // Obter um modelo de avaliação específico com seus critérios
  getModeloAvaliacaoCompleto(id) {
    const modelo = mockModelosAvaliacao.find(m => m.id === parseInt(id));
    if (!modelo) return Promise.resolve(null);
    
    // Incluir os objetos completos dos critérios
    const criteriosLider = modelo.criterios_lider.map(
      criterioId => mockCriterios.find(c => c.id === criterioId)
    ).filter(Boolean);
    
    const criteriosAutoPares = modelo.criterios_auto_pares.map(
      criterioId => mockCriterios.find(c => c.id === criterioId)
    ).filter(Boolean);
    
    return Promise.resolve({
      ...modelo,
      criterios_lider: criteriosLider,
      criterios_auto_pares: criteriosAutoPares
    });
  },

  // Novas funções para o fluxo correto de avaliações
  getAvaliacoesCompletar(userId) {
    // Avaliações pendentes para o usuário completar
    return Promise.resolve(mockAvaliacoes.filter(av => 
      av.id_colaborador_avaliado === userId && av.status_avaliacao === "pendente_autoavaliacao"
    ));
  },

  getAvaliacoesPendentes(liderId) {
    // Avaliações pendentes que o líder precisa revisar
    return Promise.resolve(mockAvaliacoes.filter(av => 
      av.id_lider_avaliador === liderId && av.status_avaliacao === "pendente_lider"
    ));
  },

  criarNovaAvaliacao(dados) {
    const novaAvaliacao = {
      id: mockAvaliacoes.length + 1,
      ...dados,
      status_avaliacao: "pendente_autoavaliacao",
      nota_final_calculada: null,
      data_inicio_avaliacao: new Date().toISOString()
    };
    mockAvaliacoes.push(novaAvaliacao);
    return Promise.resolve(novaAvaliacao);
  },

  // Mantenha as funções existentes para compatibilidade
  create(data) {
    const newId = Math.max(...mockData.map(item => item.id)) + 1;
    const newItem = { ...data, id: newId };
    mockData.push(newItem);
    return Promise.resolve(newItem);
  },

  update(id, data) {
    const index = mockData.findIndex(item => item.id === parseInt(id));
    if (index >= 0) {
      mockData[index] = { ...data, id: parseInt(id) };
      return Promise.resolve(mockData[index]);
    }
    return Promise.resolve(null);
  },

  delete(id) {
    const index = mockData.findIndex(item => item.id === parseInt(id));
    if (index >= 0) {
      mockData.splice(index, 1);
      return Promise.resolve(true);
    }
    return Promise.resolve(false);
  }
};

export default performanceService;

// Constantes para o módulo de avaliações

export const TIPOS_AVALIACAO = {
  DESEMPENHO: {
    MENSAL: 'mensal',
    TRIMESTRAL: 'trimestral',
    SEMESTRAL: 'semestral',
    ANUAL: 'anual'
  },
  EXPERIENCIA: {
    PERIODO_TESTE: 'periodo_teste',
    FINAL_CONTRATO: 'final_contrato'
  }
};

export const STATUS_AVALIACAO = {
  PENDENTE_AUTOAVALIACAO: 'pendente_autoavaliacao',
  PENDENTE_LIDER: 'pendente_lider',
  EM_REVISAO_LIDER: 'em_revisao_lider',
  CONCLUIDA: 'concluida',
  CANCELADA: 'cancelada'
};

export const PESO_AVALIACAO = {
  PADRAO: 1.0,
  LIDER: 1.5  // Peso maior para critérios de líder
};

export const ESCALAS_AVALIACAO = {
  PADRAO: [1, 2, 3, 4, 5],
  EXPANDIDA: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
};

export const ORIGEM_CRITERIO = {
  LIDER: 'lider',
  AMBOS: 'ambos'
};

export const TIPO_CRITERIO = {
  ESCALA: 'quantitativo_escala',
  TEXTO: 'qualitativo_texto',
  META: 'meta_numerica'
};

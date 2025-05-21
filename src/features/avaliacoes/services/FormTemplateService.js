import { FormTemplate } from '../models/FormTemplate';
import { TIPOS_AVALIACAO } from '../../../utils/constants/avaliacoes';

// Mock de dados para desenvolvimento
const mockTemplates = [
  new FormTemplate({
    id: '1',
    title: 'Avaliação de Desempenho Trimestral',
    description: 'Formulário padrão para avaliações trimestrais de desempenho',
    type: 'desempenho',
    subtype: TIPOS_AVALIACAO.DESEMPENHO.TRIMESTRAL,
    sections: [
      FormTemplate.createSection({
        title: 'Metas e Objetivos',
        description: 'Avalie o cumprimento das metas estabelecidas',
        items: [
          FormTemplate.createItem({
            question: 'Grau de cumprimento das metas estabelecidas',
            type: 'rating',
            options: [1, 2, 3, 4, 5]
          }),
          FormTemplate.createItem({
            question: 'Comentários sobre as metas atingidas',
            type: 'text'
          })
        ]
      }),
      FormTemplate.createSection({
        title: 'Competências Técnicas',
        description: 'Avalie as competências técnicas do colaborador',
        items: [
          FormTemplate.createItem({
            question: 'Conhecimento técnico',
            type: 'rating',
            options: [1, 2, 3, 4, 5]
          }),
          FormTemplate.createItem({
            question: 'Capacidade de resolução de problemas',
            type: 'rating',
            options: [1, 2, 3, 4, 5]
          })
        ]
      })
    ],
    status: 'active',
    validFrom: new Date('2023-01-01'),
    validUntil: new Date('2023-12-31')
  }),
  new FormTemplate({
    id: '2',
    title: 'Avaliação de Desempenho Anual',
    description: 'Formulário completo para avaliações anuais',
    type: 'desempenho',
    subtype: TIPOS_AVALIACAO.DESEMPENHO.ANUAL,
    status: 'draft'
  })
];

export class FormTemplateService {
  /**
   * Retorna todos os templates de formulários
   */
  static async getAll() {
    // Simulação de chamada à API
    return Promise.resolve([...mockTemplates]);
  }

  /**
   * Retorna templates filtrados por tipo
   */
  static async getByType(type) {
    const templates = [...mockTemplates].filter(template => template.type === type);
    return Promise.resolve(templates);
  }

  /**
   * Retorna um template específico por ID
   */
  static async getById(id) {
    const template = mockTemplates.find(template => template.id === id);
    if (!template) {
      return Promise.resolve(null);
    }
    return Promise.resolve({...template});
  }

  /**
   * Cria um novo template
   */
  static async create(templateData) {
    const newTemplate = new FormTemplate({
      ...templateData,
      id: (mockTemplates.length + 1).toString(),
      createdAt: new Date(),
      updatedAt: new Date()
    });
    mockTemplates.push(newTemplate);
    return Promise.resolve({...newTemplate});
  }

  /**
   * Atualiza um template existente
   */
  static async update(id, templateData) {
    const index = mockTemplates.findIndex(template => template.id === id);
    if (index === -1) {
      return Promise.reject(new Error('Template não encontrado'));
    }
    
    mockTemplates[index] = {
      ...mockTemplates[index],
      ...templateData,
      updatedAt: new Date()
    };
    
    return Promise.resolve({...mockTemplates[index]});
  }

  /**
   * Exclui um template
   */
  static async delete(id) {
    const index = mockTemplates.findIndex(template => template.id === id);
    if (index === -1) {
      return Promise.reject(new Error('Template não encontrado'));
    }
    
    mockTemplates.splice(index, 1);
    return Promise.resolve(true);
  }
}

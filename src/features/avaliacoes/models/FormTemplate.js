/**
 * Modelo de dados para templates de formulários de avaliação
 */
export class FormTemplate {
  constructor({
    id = null,
    title = '',
    description = '',
    type = '', // 'desempenho' ou 'experiencia'
    subtype = '', // 'trimestral', 'anual', etc.
    sections = [],
    createdBy = '',
    createdAt = new Date(),
    updatedAt = new Date(),
    status = 'draft', // 'draft', 'active', 'archived'
    validFrom = null,
    validUntil = null
  } = {}) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.type = type;
    this.subtype = subtype;
    this.sections = sections;
    this.createdBy = createdBy;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.status = status;
    this.validFrom = validFrom;
    this.validUntil = validUntil;
  }

  /**
   * Retorna uma nova seção para o template
   */
  static createSection({
    id = Date.now().toString(),
    title = '',
    description = '',
    type = 'questions', // 'questions', 'rating', 'text', etc.
    items = []
  } = {}) {
    return {
      id,
      title,
      description,
      type,
      items
    };
  }

  /**
   * Retorna um novo item para uma seção
   */
  static createItem({
    id = Date.now().toString(),
    question = '',
    description = '',
    type = 'rating', // 'rating', 'text', 'select', etc.
    required = true,
    options = []
  } = {}) {
    return {
      id,
      question,
      description,
      type,
      required,
      options
    };
  }
}

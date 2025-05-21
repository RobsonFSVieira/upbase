// Mock data para trabalhar localmente antes da integração com a API real
const mockData = [
  {
    id: 1,
    employeeName: 'João Silva',
    department: 'Desenvolvimento',
    period: '2023 Q1',
    goals: 'Completou todas as tarefas designadas',
    skills: 'Demonstrou habilidades técnicas excelentes',
    rating: '5',
    comments: 'Excelente desempenho'
  },
  {
    id: 2,
    employeeName: 'Maria Oliveira',
    department: 'Marketing',
    period: '2023 Q1',
    goals: 'Atingiu 90% das metas estabelecidas',
    skills: 'Boa comunicação e trabalho em equipe',
    rating: '4',
    comments: 'Bom desempenho geral'
  },
  {
    id: 3,
    employeeName: 'Carlos Santos',
    department: 'Recursos Humanos',
    period: '2023 Q2',
    goals: 'Concluiu os processos seletivos no prazo',
    skills: 'Excelente capacidade de organização',
    rating: '4',
    comments: 'Colaborador dedicado'
  }
];

// Versão simplificada do serviço focada em dados mockados
export const performanceService = {
  getAll() {
    console.log('Fornecendo dados mockados para avaliações');
    return Promise.resolve([...mockData]);
  },

  getById(id) {
    const item = mockData.find(item => item.id === parseInt(id));
    return Promise.resolve(item || null);
  },

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

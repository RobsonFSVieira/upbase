import axios from 'axios';

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

// Base URL para API
const BASE_URL = process.env.REACT_APP_API_URL || 'https://api.example.com';

// Cache de dados para evitar múltiplas requisições
let cachedData = null;

export const performanceService = {
  async getAll() {
    try {
      // Usar cache se disponível para evitar chamadas repetidas
      if (cachedData) {
        console.log('Usando dados em cache');
        return Promise.resolve(cachedData);
      }

      // Em desenvolvimento, usar mock data imediatamente sem delay artificial
      if (process.env.NODE_ENV !== 'production' || BASE_URL === 'https://api.example.com') {
        console.log('Usando dados mockados para avaliações');
        cachedData = [...mockData];
        return Promise.resolve(cachedData);
      }
      
      // Em produção, usar a API real
      const response = await axios.get(`${BASE_URL}/performance`);
      cachedData = response.data;
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar avaliações:', error);
      // Fallback para mock data sem delay
      return Promise.resolve([...mockData]); 
    }
  },

  // Resetar cache quando novos dados forem criados ou atualizados
  resetCache() {
    cachedData = null;
  },

  async getById(id) {
    try {
      // Buscar do cache primeiro se disponível
      if (cachedData) {
        const cachedItem = cachedData.find(item => item.id === parseInt(id));
        if (cachedItem) {
          return Promise.resolve(cachedItem);
        }
      }

      if (process.env.NODE_ENV !== 'production' || BASE_URL === 'https://api.example.com') {
        const item = mockData.find(item => item.id === parseInt(id));
        return Promise.resolve(item || null);
      }
      
      const response = await axios.get(`${BASE_URL}/performance/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erro ao buscar avaliação ${id}:`, error);
      return mockData.find(item => item.id === parseInt(id)) || null;
    }
  },

  async create(data) {
    try {
      if (process.env.NODE_ENV === 'production' && BASE_URL !== 'https://api.example.com') {
        const response = await axios.post(`${BASE_URL}/performance`, data);
        return response.data;
      }
      return { ...data, id: mockData.length + 1 };
    } catch (error) {
      console.error('Erro ao criar avaliação:', error);
      throw error;
    }
  },

  async update(id, data) {
    try {
      if (process.env.NODE_ENV === 'production' && BASE_URL !== 'https://api.example.com') {
        const response = await axios.put(`${BASE_URL}/performance/${id}`, data);
        return response.data;
      }
      return { ...data, id: parseInt(id) };
    } catch (error) {
      console.error(`Erro ao atualizar avaliação ${id}:`, error);
      throw error;
    }
  },

  async delete(id) {
    try {
      if (process.env.NODE_ENV === 'production' && BASE_URL !== 'https://api.example.com') {
        await axios.delete(`${BASE_URL}/performance/${id}`);
        return true;
      }
      const index = mockData.findIndex(item => item.id === parseInt(id));
      if (index >= 0) {
        mockData.splice(index, 1);
        return true;
      }
      return false;
    } catch (error) {
      console.error(`Erro ao deletar avaliação ${id}:`, error);
      return false;
    }
  }
};

export default performanceService;

import axios from 'axios';

// Mock data para desenvolvimento
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
  }
];

// Base URL para API
const BASE_URL = process.env.REACT_APP_API_URL || 'https://api.example.com';

export const performanceService = {
  async getAll() {
    try {
      // Em produção, usar a API real
      if (process.env.NODE_ENV === 'production' && BASE_URL !== 'https://api.example.com') {
        const response = await axios.get(`${BASE_URL}/performance`);
        return response.data;
      }
      
      // Em desenvolvimento, usar mock data
      console.log('Usando dados mockados para avaliações');
      return mockData;
    } catch (error) {
      console.error('Erro ao buscar avaliações:', error);
      return mockData; // Fallback para mock data
    }
  },

  async getById(id) {
    try {
      if (process.env.NODE_ENV === 'production' && BASE_URL !== 'https://api.example.com') {
        const response = await axios.get(`${BASE_URL}/performance/${id}`);
        return response.data;
      }
      return mockData.find(item => item.id === parseInt(id)) || null;
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
  }
};

export default performanceService;

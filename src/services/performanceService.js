import axios from 'axios';

const BASE_URL = 'YOUR_API_URL/performance';

export const performanceService = {
  async getAll() {
    const response = await axios.get(BASE_URL);
    return response.data;
  },

  async getById(id) {
    const response = await axios.get(`${BASE_URL}/${id}`);
    return response.data;
  },

  async create(data) {
    const response = await axios.post(BASE_URL, data);
    return response.data;
  },

  async update(id, data) {
    const response = await axios.put(`${BASE_URL}/${id}`, data);
    return response.data;
  },

  async delete(id) {
    await axios.delete(`${BASE_URL}/${id}`);
  }
};

export default performanceService;

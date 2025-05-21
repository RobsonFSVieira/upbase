import axios from 'axios';

const API_URL = 'sua_api_url/performance';

export const performanceService = {
  async saveEvaluation(data) {
    return await axios.post(API_URL, data);
  },

  async getEvaluations() {
    return await axios.get(API_URL);
  },

  async getEvaluationById(id) {
    return await axios.get(`${API_URL}/${id}`);
  }
};

export default performanceService;

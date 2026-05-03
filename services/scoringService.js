import api from './api';

export const scoringService = {
  recordDelivery: (data) => api.post('/scoring/delivery', data),
};

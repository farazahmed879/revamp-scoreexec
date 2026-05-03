import api from './api';

export const matchesService = {
  getAll: (tournamentId) => api.get('/matches', { params: { tournamentId } }),
  getById: (id) => api.get(`/matches/${id}`),
  create: (data) => api.post('/matches', data),
  update: (id, data) => api.put(`/matches/${id}`, data),
  delete: (id) => api.delete(`/matches/${id}`),
  startMatch: (id, data) => api.post(`/matches/${id}/start`, data),
  createInnings: (id, data) => api.post(`/matches/${id}/innings`, data),
  createOver: (id, data) => api.post(`/matches/${id}/overs`, data),
};

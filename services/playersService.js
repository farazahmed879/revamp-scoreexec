import api from './api';

export const playersService = {
  getAll: (teamId) => api.get('/players', { params: { teamId } }),
  getById: (id) => api.get(`/players/${id}`),
  create: (data) => api.post('/players', data),
  update: (id, data) => api.put(`/players/${id}`, data),
  delete: (id) => api.delete(`/players/${id}`),
  getProfile: (id, params) => api.get(`/players/${id}/profile`, { params }),
};

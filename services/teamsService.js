import api from './api';

export const teamsService = {
  getAll: (tournamentId) => api.get('/teams', { params: { tournamentId } }),
  getById: (id) => api.get(`/teams/${id}`),
  getProfile: (id) => api.get(`/teams/${id}/profile`),
  getPlayers: (id) => api.get(`/teams/${id}/players`),
  create: (data) => api.post('/teams', data),
  update: (id, data) => api.put(`/teams/${id}`, data),
  delete: (id) => api.delete(`/teams/${id}`),
};

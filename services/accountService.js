import api from './api';

export const accountService = {
  getMe: () => api.get('/account/me'),
  updateProfile: (data) => api.put('/account/profile', data),
  changeEmail: (data) => api.put('/account/email', data),
  changePassword: (data) => api.put('/account/password', data),
};

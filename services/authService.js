import api from './api';
import Cookies from 'js-cookie';

const AUTH_COOKIE = 'scorexec_token';
const USER_COOKIE = 'scorexec_user';

export const authService = {
  login: async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    const { token, email: userEmail, fullName, role, tenantId } = response.data;

    Cookies.set(AUTH_COOKIE, token, { expires: 1 });
    Cookies.set(USER_COOKIE, JSON.stringify({ email: userEmail, fullName, role, tenantId }), { expires: 1 });

    return response.data;
  },

  logout: () => {
    Cookies.remove(AUTH_COOKIE);
    Cookies.remove(USER_COOKIE);
    if (typeof window !== 'undefined') {
      window.location.href = '/login';
    }
  },

  getToken: () => Cookies.get(AUTH_COOKIE),

  getUser: () => {
    const user = Cookies.get(USER_COOKIE);
    return user ? JSON.parse(user) : null;
  },

  isAuthenticated: () => !!Cookies.get(AUTH_COOKIE),
  
  updateUser: (userData) => {
    Cookies.set(USER_COOKIE, JSON.stringify(userData), { expires: 1 });
  }
};

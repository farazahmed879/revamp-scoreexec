'use client';

import { createContext, useState, useEffect, useCallback } from 'react';
import { authService } from '@/services/authService';
import api from '@/services/api';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stored = authService.getUser();
    if (stored && authService.isAuthenticated()) {
      setUser(stored);
    }
    setIsLoading(false);
  }, []);

  const login = useCallback(async (email, password) => {
    const data = await authService.login(email, password);
    setUser({ email: data.email, fullName: data.fullName, role: data.role, tenantId: data.tenantId });
    return data;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    authService.logout();
  }, []);

  const refreshUser = useCallback(async () => {
    try {
      const response = await api.get('/account/me');
      const userData = { 
        email: response.data.email, 
        fullName: `${response.data.firstName} ${response.data.lastName}`,
        firstName: response.data.firstName,
        lastName: response.data.lastName,
        phoneNumber: response.data.phoneNumber,
        role: response.data.role, 
        tenantId: response.data.tenantId 
      };
      setUser(userData);
      authService.updateUser(userData);
    } catch (err) {
      console.error('Failed to refresh user', err);
    }
  }, []);

  const isAuthenticated = !!user && authService.isAuthenticated();

  return (
    <AuthContext.Provider value={{ user, isLoading, isAuthenticated, login, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
}

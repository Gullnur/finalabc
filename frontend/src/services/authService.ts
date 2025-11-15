import api from './api';
import { LoginRequest, SignupRequest, LoginResponse, VerifyRequest } from '../types';

export const authService = {
  login: async (data: LoginRequest): Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>('/api/v1/auth/login', data);
    return response.data;
  },

  signup: async (data: SignupRequest): Promise<void> => {
    await api.post('/api/v1/auth/signup', data);
  },

  verify: async (data: VerifyRequest): Promise<void> => {
    await api.post('/api/v1/auth/verify', data);
  },

  validateToken: async (token: string): Promise<boolean> => {
    try {
      const response = await api.post('/api/v1/auth/validate', { token });
      return response.data.valid || false;
    } catch {
      return false;
    }
  },
};


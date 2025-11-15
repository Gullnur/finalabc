import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authService } from '../services/authService';

interface AuthContextType {
  isAuthenticated: boolean;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const storedToken = localStorage.getItem('token');
      if (storedToken) {
        // Token varsa, dərhal set et (validate-i skip et test üçün)
        setToken(storedToken);
        // Validate-i background-da et
        try {
          const isValid = await authService.validateToken(storedToken);
          if (!isValid) {
            localStorage.removeItem('token');
            setToken(null);
          }
        } catch (error) {
          // Validate uğursuz olsa belə, token-i saxla (network problemi ola bilər)
          console.error('Token validation error:', error);
        }
      }
      setLoading(false);
    };
    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    const response = await authService.login({ email, password });
    const token = response.token;
    localStorage.setItem('token', token);
    // State-i dərhal yenilə
    setToken(token);
    // State-in yenilənməsini təmin et
    return Promise.resolve();
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!token,
        token,
        login,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};


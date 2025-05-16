// contexts/AuthContext.tsx
'use client';

import { createContext, ReactNode, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  resetPassword: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const login = async (email: string, password: string) => {
    // Mock API call
    await new Promise(resolve => setTimeout(resolve, 500));
    const mockUser = { id: '1', name: 'Demo User', email };
    localStorage.setItem('user', JSON.stringify(mockUser));
    setUser(mockUser);
  };

  const register = async (name: string, email: string, password: string) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const newUser = { id: Date.now().toString(), name, email };
    localStorage.setItem('user', JSON.stringify(newUser));
    setUser(newUser);
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  const resetPassword = async (email: string) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    localStorage.setItem('resetToken', 'mock-token');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, resetPassword }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  AuthUser,
  UserRole,
  login as apiLogin,
  logout as apiLogout,
  getCurrentUser,
  getStoredUser,
  getAccessToken,
  clearTokens,
} from '@/lib/api';

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
  hasRole: (role: UserRole) => boolean;
  isAdmin: boolean;
  isSuperAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check if user is authenticated on mount
  useEffect(() => {
    const initAuth = async () => {
      const token = getAccessToken();
      const storedUser = getStoredUser();

      if (token && storedUser) {
        // Try to validate token by fetching current user
        const response = await getCurrentUser();
        if (response.success && response.data) {
          setUser(response.data);
        } else {
          // Token invalid, clear storage
          clearTokens();
          setUser(null);
        }
      }

      setIsLoading(false);
    };

    initAuth();
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await apiLogin(email, password);

      if (response.success && response.data) {
        setUser(response.data.user);
        return { success: true };
      }

      return { success: false, error: response.error || 'Erro ao fazer login' };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    setIsLoading(true);
    try {
      await apiLogout();
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const refreshUser = useCallback(async () => {
    const response = await getCurrentUser();
    if (response.success && response.data) {
      setUser(response.data);
    }
  }, []);

  const hasRole = useCallback((role: UserRole) => {
    if (!user) return false;

    const roleHierarchy: Record<UserRole, number> = {
      SUPER_ADMIN: 4,
      ADMIN: 3,
      OPERATOR: 2,
      VIEWER: 1,
    };

    return roleHierarchy[user.role] >= roleHierarchy[role];
  }, [user]);

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
    refreshUser,
    hasRole,
    isAdmin: user?.role === 'ADMIN' || user?.role === 'SUPER_ADMIN',
    isSuperAdmin: user?.role === 'SUPER_ADMIN',
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

"use client";

import type { User, UserRole } from '@/types';
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';

interface AuthContextType {
  user: User | null;
  login: (role: UserRole, name?: string) => void;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const mockUsers: Record<UserRole, User> = {
  SACCO_MEMBER: { id: 'member123', name: 'Jane Doe', email: 'member@sacco.com', role: 'SACCO_MEMBER' },
  LOAN_OFFICER: { id: 'loanoff123', name: 'John Loan', email: 'loanofficer@sacco.com', role: 'LOAN_OFFICER' },
  WELFARE_OFFICER: { id: 'welfareoff123', name: 'Alice Welfare', email: 'welfareofficer@sacco.com', role: 'WELFARE_OFFICER' },
  SUPER_ADMIN: { id: 'admin123', name: 'Super Admin', email: 'admin@sacco.com', role: 'SUPER_ADMIN' },
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    setLoading(true);
    try {
      const storedUserRole = localStorage.getItem('userRole') as UserRole | null;
      if (storedUserRole && mockUsers[storedUserRole]) {
        const storedUserName = localStorage.getItem('userName') || mockUsers[storedUserRole].name;
        setUser({...mockUsers[storedUserRole], name: storedUserName});
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Error accessing localStorage:", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!loading && !user && !pathname.startsWith('/login')) {
      router.push('/login');
    }
  }, [user, loading, router, pathname]);

  const login = (role: UserRole, name: string = "User") => {
    const mockUser = {...mockUsers[role], name: name || mockUsers[role].name };
    setUser(mockUser);
    localStorage.setItem('userRole', role);
    localStorage.setItem('userName', mockUser.name);
    
    // Redirect after login
    switch (role) {
      case 'SACCO_MEMBER':
        router.push('/dashboard/member');
        break;
      case 'LOAN_OFFICER':
        router.push('/dashboard/loan-officer');
        break;
      case 'WELFARE_OFFICER':
        router.push('/dashboard/welfare-officer');
        break;
      case 'SUPER_ADMIN':
        router.push('/dashboard/admin');
        break;
      default:
        router.push('/dashboard');
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('userRole');
    localStorage.removeItem('userName');
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
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

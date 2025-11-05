import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from '@/lib/types';

type UserRole = 'manager' | 'student' | 'superadmin';

const mockManager: User = {
  id: 'mgr-01',
  name: 'Suresh Kumar',
  email: 'suresh.kumar@messconnect.com',
  role: 'manager',
  avatarUrl: 'https://api.dicebear.com/8.x/lorelei/svg?seed=Suresh',
};

const mockStudent: User = {
  id: 'stu-02',
  name: 'Priya Patel',
  email: 'priya.patel@messconnect.com',
  role: 'student',
  avatarUrl: 'https://api.dicebear.com/8.x/lorelei/svg?seed=Priya',
};

const mockSuperAdmin: User = {
  id: 'adm-01',
  name: 'Admin User',
  email: 'admin@messconnect.com',
  role: 'superadmin',
  avatarUrl: 'https://api.dicebear.com/8.x/initials/svg?seed=Admin',
};

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading] = useState(false);
  const navigate = useNavigate();

  const login = useCallback(
    (role: UserRole) => {
      switch (role) {
        case 'manager':
          setUser(mockManager);
          navigate('/manager/dashboard');
          break;
        case 'student':
          setUser(mockStudent);
          navigate('/student/dashboard');
          break;
        case 'superadmin':
          setUser(mockSuperAdmin);
          navigate('/superadmin/dashboard');
          break;
        default:
          // Should not happen with TypeScript, but good practice
          break;
      }
    },
    [navigate]
  );

  const logout = useCallback(() => {
    setUser(null);
    navigate('/login');
  }, [navigate]);

  const toggleRole = useCallback(() => {
    setUser((currentUser) => {
      if (currentUser?.role === 'manager') return mockStudent;
      if (currentUser?.role === 'student') return mockSuperAdmin;
      return mockManager;
    });
  }, []);

  return {
    user,
    loading,
    login,
    logout,
    toggleRole,
    isAuthenticated: !!user,
    isManager: user?.role === 'manager',
    isStudent: user?.role === 'student',
    isSuperAdmin: user?.role === 'superadmin',
  };
};
//
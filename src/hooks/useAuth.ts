import { useState, useCallback } from 'react';
import { User } from '@/lib/types';
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
export const useAuth = () => {
  const [user, setUser] = useState<User | null>(mockManager);
  const [loading] = useState(false);
  const toggleRole = useCallback(() => {
    setUser((currentUser) => (currentUser?.role === 'manager' ? mockStudent : mockManager));
  }, []);
  return {
    user,
    loading,
    toggleRole,
    isAuthenticated: !!user,
    isManager: user?.role === 'manager',
    isStudent: user?.role === 'student',
    isSuperAdmin: user?.role === 'superadmin',
  };
};
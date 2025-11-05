import { useState } from 'react';
import { User } from '@/lib/types';
const mockUser: User = {
  id: 'mgr-01',
  name: 'Suresh Kumar',
  email: 'suresh.kumar@messconnect.com',
  role: 'manager',
  avatarUrl: 'https://api.dicebear.com/8.x/lorelei/svg?seed=Suresh',
};
export const useAuth = () => {
  const [user] = useState<User | null>(mockUser);
  const [loading] = useState(false);
  return {
    user,
    loading,
    isAuthenticated: !!user,
    isManager: user?.role === 'manager',
    isStudent: user?.role === 'student',
    isSuperAdmin: user?.role === 'superadmin',
  };
};
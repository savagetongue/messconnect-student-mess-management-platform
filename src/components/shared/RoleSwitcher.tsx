import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { Users } from 'lucide-react';
export function RoleSwitcher() {
  const { toggleRole, isManager, isStudent } = useAuth();
  // This component should only be rendered in development
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }
  const getNextRole = () => {
    if (isManager) return 'Student';
    if (isStudent) return 'SuperAdmin';
    return 'Manager';
  };
  return (
    <div className="fixed bottom-4 left-4 z-50">
      <Button
        onClick={toggleRole}
        variant="outline"
        className="bg-card shadow-lg"
      >
        <Users className="h-4 w-4 mr-2" />
        Switch to {getNextRole()}
      </Button>
    </div>
  );
}
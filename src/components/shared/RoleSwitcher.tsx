import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { Users } from 'lucide-react';
export function RoleSwitcher() {
  const { toggleRole, isManager } = useAuth();
  // This component should only be rendered in development
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }
  return (
    <div className="fixed bottom-4 left-4 z-50">
      <Button
        onClick={toggleRole}
        variant="outline"
        className="bg-card shadow-lg"
      >
        <Users className="h-4 w-4 mr-2" />
        Switch to {isManager ? 'Student' : 'Manager'}
      </Button>
    </div>
  );
}
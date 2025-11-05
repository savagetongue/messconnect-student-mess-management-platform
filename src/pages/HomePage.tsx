import { Navigate, Outlet } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import { ManagerSidebar } from '@/components/manager/ManagerSidebar';
import { useAuth } from '@/hooks/useAuth';
import { Skeleton } from '@/components/ui/skeleton';
function ManagerLayout() {
  return (
    <AppLayout sidebar={<ManagerSidebar />}>
      <Outlet />
    </AppLayout>
  );
}
export function HomePage() {
  const { isAuthenticated, isManager, loading } = useAuth();
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="space-y-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
    );
  }
  if (!isAuthenticated) {
    // In a real app, you'd redirect to a login page.
    // For this phase, we assume the manager is always logged in.
    // return <Navigate to="/login" replace />;
  }
  if (isManager) {
    // The ManagerLayout will render the correct nested page via <Outlet />
    return <ManagerLayout />;
  }
  // Fallback for other roles or if not authenticated (for future phases)
  // For now, this will effectively redirect to the manager dashboard if the path is "/"
  return <Navigate to="/manager/dashboard" replace />;
}
import { Navigate, Outlet } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import { ManagerSidebar } from '@/components/manager/ManagerSidebar';
import { StudentSidebar } from '@/components/student/StudentSidebar';
import { SuperAdminSidebar } from '@/components/superadmin/SuperAdminSidebar';
import { useAuth } from '@/hooks/useAuth';
import { Skeleton } from '@/components/ui/skeleton';
function ManagerLayout() {
  return (
    <AppLayout sidebar={<ManagerSidebar />}>
      <Outlet />
    </AppLayout>
  );
}
function StudentLayout() {
  return (
    <AppLayout sidebar={<StudentSidebar />}>
      <Outlet />
    </AppLayout>
  );
}
function SuperAdminLayout() {
  return (
    <AppLayout sidebar={<SuperAdminSidebar />}>
      <Outlet />
    </AppLayout>
  );
}
export function HomePage() {
  const { isAuthenticated, isManager, isStudent, isSuperAdmin, loading } = useAuth();
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
    // In a real app, redirect to a login page.
    // return <Navigate to="/login" replace />;
  }
  if (isSuperAdmin) {
    return <SuperAdminLayout />;
  }
  if (isManager) {
    return <ManagerLayout />;
  }
  if (isStudent) {
    return <StudentLayout />;
  }
  // Fallback redirect
  return <Navigate to="/manager/dashboard" replace />;
}
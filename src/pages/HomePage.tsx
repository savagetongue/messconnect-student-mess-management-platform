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
    // This is the critical fix: redirect unauthenticated users to the login page.
    return <Navigate to="/login" replace />;
  }
  // For the purpose of this demo, we will cycle through roles.
  // A real app would have a single role per user.
  if (isSuperAdmin) {
    return <SuperAdminLayout />;
  }
  if (isManager) {
    return <ManagerLayout />;
  }
  if (isStudent) {
    return <StudentLayout />;
  }
  // Fallback for when no role matches, though our mock auth always has one.
  return <Navigate to="/login" replace />;
}
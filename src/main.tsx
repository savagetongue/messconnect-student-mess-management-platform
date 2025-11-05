import '@/lib/errorReporter';
import { enableMapSet } from "immer";
enableMapSet();
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { RouteErrorBoundary } from '@/components/RouteErrorBoundary';
import '@/index.css'
import { HomePage } from '@/pages/HomePage'
// Auth & Public Pages
import { LoginPage } from '@/pages/auth/LoginPage';
import { RegisterPage } from '@/pages/auth/RegisterPage';
import { GuestPaymentPage } from '@/pages/guest/GuestPaymentPage';
// Manager Pages
import { ManagerDashboardPage } from '@/pages/manager/DashboardPage';
import { ManagerJoinRequestsPage } from '@/pages/manager/JoinRequestsPage';
import { ManagerBroadcastPage } from '@/pages/manager/BroadcastPage';
import { ManagerComplaintsPage } from '@/pages/manager/ComplaintsPage';
import { ManagerReportsPage } from '@/pages/manager/ReportsPage';
// Student Pages
import { StudentDashboardPage } from '@/pages/student/DashboardPage';
import { StudentComplaintsPage } from '@/pages/student/ComplaintsPage';
import { StudentPaymentsPage } from '@/pages/student/PaymentsPage';
// SuperAdmin Pages
import { SuperAdminDashboardPage } from '@/pages/superadmin/DashboardPage';
import { UserManagementPage } from '@/pages/superadmin/UserManagementPage';
import { AuditLogsPage } from '@/pages/superadmin/AuditLogsPage';
const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/guest-payment",
    element: <GuestPaymentPage />,
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/",
    element: <HomePage />,
    errorElement: <RouteErrorBoundary />,
    children: [
      // Manager Routes
      { path: "manager/dashboard", element: <ManagerDashboardPage /> },
      { path: "manager/join-requests", element: <ManagerJoinRequestsPage /> },
      { path: "manager/broadcasts", element: <ManagerBroadcastPage /> },
      { path: "manager/complaints", element: <ManagerComplaintsPage /> },
      { path: "manager/reports", element: <ManagerReportsPage /> },
      // Student Routes
      { path: "student/dashboard", element: <StudentDashboardPage /> },
      { path: "student/complaints", element: <StudentComplaintsPage /> },
      { path: "student/payments", element: <StudentPaymentsPage /> },
      // SuperAdmin Routes
      { path: "superadmin/dashboard", element: <SuperAdminDashboardPage /> },
      { path: "superadmin/users", element: <UserManagementPage /> },
      { path: "superadmin/audits", element: <AuditLogsPage /> },
      // Redirect from root to manager dashboard by default for authenticated users
      { index: true, element: <Navigate to="/manager/dashboard" replace /> }
    ]
  },
]);
// Do not touch this code
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <RouterProvider router={router} />
    </ErrorBoundary>
  </StrictMode>,
)
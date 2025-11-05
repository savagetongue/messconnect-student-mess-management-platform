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
import { ManagerDashboardPage } from '@/pages/manager/DashboardPage';
import { ManagerJoinRequestsPage } from '@/pages/manager/JoinRequestsPage';
import { ManagerBroadcastPage } from '@/pages/manager/BroadcastPage';
import { ManagerComplaintsPage } from '@/pages/manager/ComplaintsPage';
import { StudentDashboardPage } from '@/pages/student/DashboardPage';
import { StudentComplaintsPage } from '@/pages/student/ComplaintsPage';
const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <RouteErrorBoundary />,
    children: [
      // Manager Routes
      {
        path: "manager/dashboard",
        element: <ManagerDashboardPage />,
      },
      {
        path: "manager/join-requests",
        element: <ManagerJoinRequestsPage />,
      },
      {
        path: "manager/broadcasts",
        element: <ManagerBroadcastPage />,
      },
      {
        path: "manager/complaints",
        element: <ManagerComplaintsPage />,
      },
      // Student Routes
      {
        path: "student/dashboard",
        element: <StudentDashboardPage />,
      },
      {
        path: "student/complaints",
        element: <StudentComplaintsPage />,
      },
      // Redirect from root to manager dashboard by default
      {
        index: true,
        element: <Navigate to="/manager/dashboard" replace />,
      }
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
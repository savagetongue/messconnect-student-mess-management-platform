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
const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <RouteErrorBoundary />,
    children: [
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
      // Redirect from root to manager dashboard
      {
        index: true,
        element: <Navigate to="/manager/dashboard" replace />,
      }
    ]
  },
  // Add other top-level routes like /login, /student etc. in future phases
]);
// Do not touch this code
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <RouterProvider router={router} />
    </ErrorBoundary>
  </StrictMode>,
)
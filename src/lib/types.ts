export interface User {
  id: string;
  name: string;
  email: string;
  role: 'manager' | 'student' | 'superadmin';
  avatarUrl?: string;
}
export type JoinRequestStatus = 'pending' | 'accepted' | 'rejected' | 'waitlisted';
export interface JoinRequest {
  id: string;
  student: {
    id: string;
    name: string;
    avatarUrl: string;
    studentId: string;
  };
  requestDate: string; // ISO 8601 format
  status: JoinRequestStatus;
}
export interface DashboardStats {
  messCapacity: {
    current: number;
    total: number;
  };
  pendingRequests: number;
  dailyGuests: number;
  monthlyRevenue: number;
}
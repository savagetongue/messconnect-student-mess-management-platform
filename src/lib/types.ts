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
export type ComplaintStatus = 'open' | 'in_progress' | 'resolved' | 'closed';
export type ComplaintPriority = 'low' | 'medium' | 'high';
export interface ComplaintReply {
  id: string;
  author: Pick<User, 'id' | 'name' | 'avatarUrl' | 'role'>;
  message: string;
  timestamp: string; // ISO 8601 format
}
export interface Complaint {
  id: string;
  student: Pick<User, 'id' | 'name' | 'avatarUrl'> & { studentId: string };
  title: string;
  description: string;
  submittedAt: string; // ISO 8601 format
  status: ComplaintStatus;
  priority: ComplaintPriority;
  tags: string[];
  replies: ComplaintReply[];
}
export interface AuditLog {
  id: string;
  actor: Pick<User, 'id' | 'name' | 'role'>;
  action: string;
  entityType: string;
  entityId: string;
  timestamp: string; // ISO 8601 format
  details: Record<string, any>;
}
export interface SystemAnalytics {
  totalUsers: number;
  totalMesses: number;
  totalRevenue: number;
  openComplaints: number;
  revenueByMonth: { month: string; revenue: number }[];
}
export type PaymentStatus = 'success' | 'pending' | 'failed';
export interface Payment {
  id: string;
  description: string;
  amount: number;
  date: string; // ISO 8601 format
  status: PaymentStatus;
}
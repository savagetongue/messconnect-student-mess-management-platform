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
import { JoinRequest, DashboardStats } from './types';
import { subDays, formatISO } from 'date-fns';
// Mock Data
const mockJoinRequests: JoinRequest[] = [
  {
    id: 'req-01',
    student: { id: 'stu-01', name: 'Aarav Sharma', avatarUrl: `https://api.dicebear.com/8.x/lorelei/svg?seed=Aarav`, studentId: 'STU2024001' },
    requestDate: formatISO(subDays(new Date(), 1)),
    status: 'pending',
  },
  {
    id: 'req-02',
    student: { id: 'stu-02', name: 'Priya Patel', avatarUrl: `https://api.dicebear.com/8.x/lorelei/svg?seed=Priya`, studentId: 'STU2024002' },
    requestDate: formatISO(subDays(new Date(), 2)),
    status: 'pending',
  },
  {
    id: 'req-03',
    student: { id: 'stu-03', name: 'Rohan Das', avatarUrl: `https://api.dicebear.com/8.x/lorelei/svg?seed=Rohan`, studentId: 'STU2024003' },
    requestDate: formatISO(subDays(new Date(), 3)),
    status: 'accepted',
  },
  {
    id: 'req-04',
    student: { id: 'stu-04', name: 'Sneha Verma', avatarUrl: `https://api.dicebear.com/8.x/lorelei/svg?seed=Sneha`, studentId: 'STU2024004' },
    requestDate: formatISO(subDays(new Date(), 5)),
    status: 'rejected',
  },
  {
    id: 'req-05',
    student: { id: 'stu-05', name: 'Vikram Singh', avatarUrl: `https://api.dicebear.com/8.x/lorelei/svg?seed=Vikram`, studentId: 'STU2024005' },
    requestDate: formatISO(subDays(new Date(), 6)),
    status: 'waitlisted',
  },
];
const mockDashboardStats: DashboardStats = {
  messCapacity: { current: 182, total: 200 },
  pendingRequests: 2,
  dailyGuests: 15,
  monthlyRevenue: 125000,
};
// Mock API functions
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
export const getDashboardStats = async (): Promise<DashboardStats> => {
  await delay(500);
  return mockDashboardStats;
};
export const getJoinRequests = async (): Promise<JoinRequest[]> => {
  await delay(800);
  return mockJoinRequests;
};
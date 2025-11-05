import { JoinRequest, DashboardStats, Complaint, ComplaintReply, User } from './types';
import { subDays, formatISO, subHours } from 'date-fns';
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
const mockComplaints: Complaint[] = [
  {
    id: 'comp-01',
    student: { id: 'stu-02', name: 'Priya Patel', avatarUrl: `https://api.dicebear.com/8.x/lorelei/svg?seed=Priya`, studentId: 'STU2024002' },
    title: 'Water cooler not working',
    description: 'The water cooler on the 2nd floor has not been working for the past 2 days. Please get it fixed.',
    submittedAt: formatISO(subDays(new Date(), 1)),
    status: 'in_progress',
    priority: 'high',
    tags: ['maintenance', 'water'],
    replies: [
      {
        id: 'rep-01',
        author: { id: 'mgr-01', name: 'Suresh Kumar', role: 'manager', avatarUrl: 'https://api.dicebear.com/8.x/lorelei/svg?seed=Suresh' },
        message: 'Thank you for reporting. I have raised a ticket with the maintenance team. It should be resolved by tomorrow EOD.',
        timestamp: formatISO(subHours(new Date(), 12)),
      },
    ],
  },
  {
    id: 'comp-02',
    student: { id: 'stu-03', name: 'Rohan Das', avatarUrl: `https://api.dicebear.com/8.x/lorelei/svg?seed=Rohan`, studentId: 'STU2024003' },
    title: 'Request for more variety in breakfast',
    description: 'The breakfast menu has been the same for the last month. It would be great to have more options.',
    submittedAt: formatISO(subDays(new Date(), 3)),
    status: 'open',
    priority: 'medium',
    tags: ['food', 'menu'],
    replies: [],
  },
  {
    id: 'comp-03',
    student: { id: 'stu-04', name: 'Sneha Verma', avatarUrl: `https://api.dicebear.com/8.x/lorelei/svg?seed=Sneha`, studentId: 'STU2024004' },
    title: 'Cleanliness issue in the dining hall',
    description: 'The tables are not being cleaned properly after meals. It is very unhygienic.',
    submittedAt: formatISO(subDays(new Date(), 5)),
    status: 'resolved',
    priority: 'high',
    tags: ['cleanliness', 'hygiene'],
    replies: [
      {
        id: 'rep-02',
        author: { id: 'mgr-01', name: 'Suresh Kumar', role: 'manager', avatarUrl: 'https://api.dicebear.com/8.x/lorelei/svg?seed=Suresh' },
        message: 'Apologies for the inconvenience. I have spoken to the cleaning staff and will personally monitor this.',
        timestamp: formatISO(subDays(new Date(), 4)),
      },
      {
        id: 'rep-03',
        author: { id: 'stu-04', name: 'Sneha Verma', role: 'student', avatarUrl: 'https://api.dicebear.com/8.x/lorelei/svg?seed=Sneha' },
        message: 'Thank you. It seems much better now.',
        timestamp: formatISO(subDays(new Date(), 2)),
      },
    ],
  },
];
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
export const getComplaintsByRole = async (role: User['role'], userId: string): Promise<Complaint[]> => {
  await delay(1000);
  if (role === 'manager') {
    return mockComplaints;
  }
  if (role === 'student') {
    return mockComplaints.filter(c => c.student.id === userId);
  }
  return [];
};
export const submitComplaint = async (complaintData: { title: string; description: string }): Promise<Complaint> => {
  await delay(700);
  const newComplaint: Complaint = {
    id: `comp-${Date.now()}`,
    student: { id: 'stu-02', name: 'Priya Patel', avatarUrl: `https://api.dicebear.com/8.x/lorelei/svg?seed=Priya`, studentId: 'STU2024002' },
    title: complaintData.title,
    description: complaintData.description,
    submittedAt: formatISO(new Date()),
    status: 'open',
    priority: 'medium', // Mocked AI triage result
    tags: ['new'], // Mocked AI triage result
    replies: [],
  };
  mockComplaints.unshift(newComplaint);
  return newComplaint;
};
export const replyToComplaint = async (complaintId: string, replyData: { message: string; author: User }): Promise<ComplaintReply> => {
  await delay(500);
  const complaint = mockComplaints.find(c => c.id === complaintId);
  const newReply: ComplaintReply = {
    id: `rep-${Date.now()}`,
    author: {
      id: replyData.author.id,
      name: replyData.author.name,
      avatarUrl: replyData.author.avatarUrl,
      role: replyData.author.role,
    },
    message: replyData.message,
    timestamp: formatISO(new Date()),
  };
  if (complaint) {
    complaint.replies.push(newReply);
  }
  return newReply;
};
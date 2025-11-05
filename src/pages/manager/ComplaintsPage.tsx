import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { format, parseISO } from 'date-fns';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { getComplaintsByRole } from '@/lib/api';
import { Complaint, ComplaintStatus, ComplaintPriority } from '@/lib/types';
import { useAuth } from '@/hooks/useAuth';
import { ComplaintDetails } from '@/components/shared/ComplaintDetails';
import { cn } from '@/lib/utils';
const statusColors: Record<ComplaintStatus, string> = {
  open: 'bg-blue-100 text-blue-800',
  in_progress: 'bg-yellow-100 text-yellow-800',
  resolved: 'bg-green-100 text-green-800',
  closed: 'bg-gray-100 text-gray-800',
};
const priorityColors: Record<ComplaintPriority, string> = {
  low: 'bg-gray-100 text-gray-800',
  medium: 'bg-orange-100 text-orange-800',
  high: 'bg-red-100 text-red-800',
};
export function ManagerComplaintsPage() {
  const { user } = useAuth();
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(null);
  useEffect(() => {
    const fetchComplaints = async () => {
      if (user) {
        setLoading(true);
        const data = await getComplaintsByRole('manager', user.id);
        setComplaints(data);
        setLoading(false);
      }
    };
    fetchComplaints();
  }, [user]);
  const renderSkeleton = () => (
    Array.from({ length: 5 }).map((_, i) => (
      <TableRow key={i}>
        <TableCell><Skeleton className="h-4 w-48" /></TableCell>
        <TableCell>
          <div className="flex items-center gap-3">
            <Skeleton className="h-10 w-10 rounded-full" />
            <Skeleton className="h-4 w-24" />
          </div>
        </TableCell>
        <TableCell><Skeleton className="h-4 w-24" /></TableCell>
        <TableCell><Skeleton className="h-6 w-20 rounded-full" /></TableCell>
        <TableCell><Skeleton className="h-6 w-20 rounded-full" /></TableCell>
      </TableRow>
    ))
  );
  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="text-4xl font-bold tracking-tight text-foreground">Student Complaints</h1>
        <p className="text-lg text-muted-foreground">Review and address student feedback and issues.</p>
      </motion.div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
        <Card>
          <CardHeader>
            <CardTitle>Complaint Inbox</CardTitle>
            <CardDescription>Click on a row to view details and reply.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Student</TableHead>
                  <TableHead>Submitted</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? renderSkeleton() : complaints.map((complaint) => (
                  <TableRow key={complaint.id} className="cursor-pointer hover:bg-muted/50" onClick={() => setSelectedComplaint(complaint)}>
                    <TableCell className="font-medium">{complaint.title}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={complaint.student.avatarUrl} />
                          <AvatarFallback>{complaint.student.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span>{complaint.student.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>{format(parseISO(complaint.submittedAt), 'MMM d, yyyy')}</TableCell>
                    <TableCell>
                      <Badge className={cn('capitalize', priorityColors[complaint.priority])}>{complaint.priority}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={cn('capitalize', statusColors[complaint.status])}>{complaint.status.replace('_', ' ')}</Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </motion.div>
      <Sheet open={!!selectedComplaint} onOpenChange={(isOpen) => !isOpen && setSelectedComplaint(null)}>
        <SheetContent className="sm:max-w-lg w-[90vw]">
          {selectedComplaint && <ComplaintDetails complaint={selectedComplaint} />}
        </SheetContent>
      </Sheet>
    </div>
  );
}
import { useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { Skeleton } from '@/components/ui/skeleton';
import { getComplaintsByRole } from '@/lib/api';
import { Complaint } from '@/lib/types';
import { useAuth } from '@/hooks/useAuth';
import { ComplaintDetails } from '@/components/shared/ComplaintDetails';
import { ComplaintForm } from '@/components/shared/ComplaintForm';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { format, parseISO } from 'date-fns';
const statusColors = {
  open: 'bg-blue-100 text-blue-800',
  in_progress: 'bg-yellow-100 text-yellow-800',
  resolved: 'bg-green-100 text-green-800',
  closed: 'bg-gray-100 text-gray-800',
};
export function StudentComplaintsPage() {
  const { user } = useAuth();
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(null);
  const [isNewComplaintSheetOpen, setIsNewComplaintSheetOpen] = useState(false);
  const fetchComplaints = useCallback(async () => {
    if (user) {
      setLoading(true);
      const data = await getComplaintsByRole('student', user.id);
      setComplaints(data);
      setLoading(false);
    }
  }, [user]);
  useEffect(() => {
    fetchComplaints();
  }, [fetchComplaints]);
  const renderSkeleton = () => (
    Array.from({ length: 3 }).map((_, i) => (
      <Card key={i} className="shadow-sm">
        <CardHeader>
          <Skeleton className="h-5 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6 mt-2" />
        </CardContent>
      </Card>
    ))
  );
  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-foreground">My Complaints</h1>
          <p className="text-lg text-muted-foreground">Track your issues and feedback here.</p>
        </div>
        <Sheet open={isNewComplaintSheetOpen} onOpenChange={setIsNewComplaintSheetOpen}>
          <SheetTrigger asChild>
            <Button size="lg">
              <PlusCircle className="h-5 w-5 mr-2" />
              New Complaint
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Submit a New Complaint</SheetTitle>
              <SheetDescription>
                Please provide details about the issue you are facing. We will look into it as soon as possible.
              </SheetDescription>
            </SheetHeader>
            <ComplaintForm mode="new" onSuccess={() => {
              setIsNewComplaintSheetOpen(false);
              fetchComplaints();
            }} />
          </SheetContent>
        </Sheet>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="space-y-4"
      >
        {loading ? renderSkeleton() : complaints.map((complaint) => (
          <Card
            key={complaint.id}
            className="shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer"
            onClick={() => setSelectedComplaint(complaint)}
          >
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{complaint.title}</CardTitle>
                <Badge className={cn('capitalize', statusColors[complaint.status])}>{complaint.status.replace('_', ' ')}</Badge>
              </div>
              <CardDescription>Submitted on {format(parseISO(complaint.submittedAt), 'MMM d, yyyy')}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground line-clamp-2">{complaint.description}</p>
            </CardContent>
          </Card>
        ))}
      </motion.div>
      <Sheet open={!!selectedComplaint} onOpenChange={(isOpen) => !isOpen && setSelectedComplaint(null)}>
        <SheetContent className="sm:max-w-lg w-[90vw]">
          {selectedComplaint && <ComplaintDetails complaint={selectedComplaint} onUpdate={fetchComplaints} />}
        </SheetContent>
      </Sheet>
    </div>
  );
}
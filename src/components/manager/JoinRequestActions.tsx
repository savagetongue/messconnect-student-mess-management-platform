import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Check, X, Clock } from 'lucide-react';
import { JoinRequest } from '@/lib/types';
import { toast } from 'sonner';
interface JoinRequestActionsProps {
  request: JoinRequest;
}
export function JoinRequestActions({ request }: JoinRequestActionsProps) {
  const handleAction = (action: 'accept' | 'reject' | 'waitlist') => {
    toast.success(`Request from ${request.student.name} has been ${action}ed.`, {
      description: `Student ID: ${request.student.studentId}`,
    });
  };
  return (
    <div className="flex items-center gap-2">
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button size="sm" variant="outline" className="bg-green-50 hover:bg-green-100 text-green-700 border-green-200">
            <Check className="h-4 w-4 mr-2" />
            Accept
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Accept Join Request?</AlertDialogTitle>
            <AlertDialogDescription>
              This will accept the join request from <strong>{request.student.name}</strong> and initiate the subscription process. Are you sure?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => handleAction('accept')} className="bg-green-600 hover:bg-green-700">
              Confirm Accept
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button size="sm" variant="outline" className="bg-red-50 hover:bg-red-100 text-red-700 border-red-200">
            <X className="h-4 w-4 mr-2" />
            Reject
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Reject Join Request?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently reject the join request from <strong>{request.student.name}</strong>. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => handleAction('reject')} className="bg-red-600 hover:bg-red-700">
              Confirm Reject
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button size="sm" variant="outline" className="bg-yellow-50 hover:bg-yellow-100 text-yellow-700 border-yellow-200">
            <Clock className="h-4 w-4 mr-2" />
            Waitlist
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Waitlist Join Request?</AlertDialogTitle>
            <AlertDialogDescription>
              This will add <strong>{request.student.name}</strong> to the waitlist. They will be notified if a spot becomes available.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => handleAction('waitlist')} className="bg-yellow-500 hover:bg-yellow-600">
              Confirm Waitlist
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
import { Complaint } from '@/lib/types';
import { SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { format, parseISO, formatDistanceToNow } from 'date-fns';
import { Send } from 'lucide-react';
interface ComplaintDetailsProps {
  complaint: Complaint;
}
export function ComplaintDetails({ complaint }: ComplaintDetailsProps) {
  return (
    <div className="flex flex-col h-full">
      <SheetHeader className="px-6 pt-6 pb-4">
        <SheetTitle className="text-xl">{complaint.title}</SheetTitle>
        <SheetDescription>
          Submitted by {complaint.student.name} on {format(parseISO(complaint.submittedAt), 'MMM d, yyyy')}
        </SheetDescription>
        <div className="flex flex-wrap gap-2 pt-2">
          {complaint.tags.map(tag => <Badge key={tag} variant="secondary">{tag}</Badge>)}
        </div>
      </SheetHeader>
      <Separator />
      <ScrollArea className="flex-grow px-6 py-4">
        <div className="space-y-6">
          {/* Original Complaint */}
          <div className="flex gap-3">
            <Avatar>
              <AvatarImage src={complaint.student.avatarUrl} />
              <AvatarFallback>{complaint.student.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <p className="font-semibold">{complaint.student.name}</p>
                <p className="text-xs text-muted-foreground">{formatDistanceToNow(parseISO(complaint.submittedAt), { addSuffix: true })}</p>
              </div>
              <div className="mt-1 p-3 bg-muted rounded-lg rounded-tl-none">
                <p className="text-sm">{complaint.description}</p>
              </div>
            </div>
          </div>
          {/* Replies */}
          {complaint.replies.map(reply => (
            <div key={reply.id} className={`flex gap-3 ${reply.author.role === 'student' ? '' : 'justify-end'}`}>
              {reply.author.role === 'student' && (
                <Avatar>
                  <AvatarImage src={reply.author.avatarUrl} />
                  <AvatarFallback>{reply.author.name.charAt(0)}</AvatarFallback>
                </Avatar>
              )}
              <div className={`flex-1 max-w-[85%] ${reply.author.role === 'manager' ? 'text-right' : ''}`}>
                <div className={`flex items-center gap-2 ${reply.author.role === 'manager' ? 'justify-end' : ''}`}>
                  <p className="font-semibold">{reply.author.name}</p>
                  <p className="text-xs text-muted-foreground">{formatDistanceToNow(parseISO(reply.timestamp), { addSuffix: true })}</p>
                </div>
                <div className={`mt-1 p-3 rounded-lg ${
                  reply.author.role === 'manager'
                    ? 'bg-primary text-primary-foreground rounded-br-none'
                    : 'bg-muted rounded-bl-none'
                }`}>
                  <p className="text-sm text-left">{reply.message}</p>
                </div>
              </div>
              {reply.author.role === 'manager' && (
                <Avatar>
                  <AvatarImage src={reply.author.avatarUrl} />
                  <AvatarFallback>{reply.author.name.charAt(0)}</AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>
      <Separator />
      <div className="px-6 py-4 bg-background">
        <div className="flex gap-2">
          <Textarea placeholder="Type your reply..." className="flex-1" />
          <Button><Send className="h-4 w-4" /></Button>
        </div>
      </div>
    </div>
  );
}
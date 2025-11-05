import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Send } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/hooks/useAuth';
import { replyToComplaint, submitComplaint } from '@/lib/api';
const newComplaintSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters.'),
  description: z.string().min(10, 'Description must be at least 10 characters.'),
});
const replySchema = z.object({
  message: z.string().min(1, 'Reply cannot be empty.'),
});
interface ComplaintFormProps {
  mode: 'new' | 'reply';
  complaintId?: string;
  onSuccess?: () => void;
}
export function ComplaintForm({ mode, complaintId, onSuccess }: ComplaintFormProps) {
  const { user } = useAuth();
  const schema = mode === 'new' ? newComplaintSchema : replySchema;
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: mode === 'new' ? { title: '', description: '' } : { message: '' },
  });
  const { isSubmitting } = form.formState;
  const onSubmit = async (values: z.infer<typeof schema>) => {
    if (!user) {
      toast.error('You must be logged in to perform this action.');
      return;
    }
    try {
      if (mode === 'new') {
        await submitComplaint(values as z.infer<typeof newComplaintSchema>, user);
        toast.success('Complaint submitted successfully!');
      } else if (mode === 'reply' && complaintId) {
        await replyToComplaint(complaintId, { message: (values as z.infer<typeof replySchema>).message, author: user });
        toast.success('Reply sent successfully!');
      }
      form.reset();
      onSuccess?.();
    } catch (error) {
      toast.error('An error occurred. Please try again.');
    }
  };
  if (mode === 'new') {
    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-4">
          <FormField control={form.control} name="title" render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl><Input placeholder="e.g., Water cooler issue" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <FormField control={form.control} name="description" render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl><Textarea placeholder="Please describe the issue in detail..." className="min-h-[120px]" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? 'Submitting...' : 'Submit Complaint'}
          </Button>
        </form>
      </Form>
    );
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-2">
        <FormField control={form.control} name="message" render={({ field }) => (
          <FormItem className="flex-1">
            <FormControl><Textarea placeholder="Type your reply..." {...field} rows={1} className="min-h-[40px] resize-none" /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <Button type="submit" disabled={isSubmitting}><Send className="h-4 w-4" /></Button>
      </form>
    </Form>
  );
}
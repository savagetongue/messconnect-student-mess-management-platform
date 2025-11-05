import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { CreditCard, Utensils } from 'lucide-react';
const paymentSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters.'),
  contact: z.string().min(10, 'Please enter a valid contact number or email.'),
  amount: z.coerce.number().positive('Amount must be positive.'),
});
export type PaymentFormValues = z.infer<typeof paymentSchema>;
export function GuestPaymentPage() {
  const form = useForm<PaymentFormValues>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      name: '',
      contact: '',
      amount: 150,
    },
  });
  function onSubmit(values: PaymentFormValues) {
    console.log(values);
    toast.success('Payment Initiated!', {
      description: `A payment link has been sent to ${values.contact}.`,
    });
    form.reset();
  }
  return (
    <div className="min-h-screen bg-muted/40 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="shadow-2xl">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-white">
                <Utensils className="h-6 w-6" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold">Guest Meal Payment</CardTitle>
            <CardDescription>Pay for a single meal securely.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="contact"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email or Phone Number</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your contact info" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Amount</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">���</span>
                          <Input type="number" placeholder="150" className="pl-7" {...field} readOnly />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" size="lg" className="w-full">
                  <CreditCard className="h-4 w-4 mr-2" />
                  Proceed to Pay
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
        <p className="text-center text-xs text-muted-foreground mt-4">
          Built with ❤��� at Cloudflare
        </p>
      </motion.div>
    </div>
  );
}
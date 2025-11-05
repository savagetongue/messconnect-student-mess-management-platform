import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CircleCheck, AlertTriangle, Clock } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
export function StudentDashboardPage() {
  const { user } = useAuth();
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring' as const,
        stiffness: 100,
      },
    },
  };
  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="text-4xl font-bold tracking-tight text-foreground">Welcome, {user?.name?.split(' ')[0]}!</h1>
        <p className="text-lg text-muted-foreground">Here's your personal mess dashboard.</p>
      </motion.div>
      <motion.div
        className="grid gap-6 md:grid-cols-1 lg:grid-cols-3"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="lg:col-span-1">
          <Card className="h-full shadow-sm hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <CardTitle>Subscription Status</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center text-center gap-4">
              <CircleCheck className="h-16 w-16 text-green-500" />
              <p className="text-2xl font-bold">Active</p>
              <p className="text-muted-foreground">Your next bill is on July 1, 2024.</p>
              <Button>Manage Subscription</Button>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div variants={itemVariants} className="lg:col-span-2">
          <Card className="h-full shadow-sm">
            <CardHeader>
              <CardTitle>Recent Payments</CardTitle>
              <CardDescription>Your last 3 transactions.</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                <li className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">June Monthly Fee</p>
                    <p className="text-sm text-muted-foreground">Paid on June 1, 2024</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">₹4,500</p>
                    <Badge variant="outline" className="text-green-700 border-green-200 bg-green-50">Success</Badge>
                  </div>
                </li>
                <li className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">May Monthly Fee</p>
                    <p className="text-sm text-muted-foreground">Paid on May 1, 2024</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">₹4,500</p>
                    <Badge variant="outline" className="text-green-700 border-green-200 bg-green-50">Success</Badge>
                  </div>
                </li>
                <li className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Guest Meal Coupon</p>
                    <p className="text-sm text-muted-foreground">Paid on April 25, 2024</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">₹150</p>
                    <Badge variant="outline" className="text-green-700 border-green-200 bg-green-50">Success</Badge>
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
}
import { motion } from 'framer-motion';
import { CreditCard } from 'lucide-react';
export function StudentPaymentsPage() {
  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold tracking-tight text-foreground">Payment History</h1>
        <p className="text-lg text-muted-foreground">View your transaction history and manage payment methods.</p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="flex flex-col items-center justify-center text-center bg-card border rounded-lg p-12 h-96"
      >
        <CreditCard className="h-16 w-16 text-muted-foreground mb-4" />
        <h2 className="text-2xl font-semibold">Coming Soon!</h2>
        <p className="text-muted-foreground mt-2 max-w-md">
          This section is under construction. You'll soon be able to view all your payments and manage your subscription here.
        </p>
      </motion.div>
    </div>
  );
}
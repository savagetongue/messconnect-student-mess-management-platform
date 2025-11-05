import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { DollarSign, Users, UserPlus, UtensilsCrossed } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { getDashboardStats } from '@/lib/api';
import { DashboardStats } from '@/lib/types';
const StatCard = ({ title, value, icon: Icon, loading, format = (v) => v }) => (
  <Card className="shadow-sm hover:shadow-lg transition-shadow duration-300">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
      <Icon className="h-5 w-5 text-muted-foreground" />
    </CardHeader>
    <CardContent>
      {loading ? (
        <Skeleton className="h-8 w-3/4" />
      ) : (
        <div className="text-3xl font-bold text-foreground">{format(value)}</div>
      )}
    </CardContent>
  </Card>
);
export function ManagerDashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      const data = await getDashboardStats();
      setStats(data);
      setLoading(false);
    };
    fetchStats();
  }, []);
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
        type: 'spring',
        stiffness: 100,
      },
    },
  };
  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="text-4xl font-bold tracking-tight text-foreground">Manager Dashboard</h1>
        <p className="text-lg text-muted-foreground">Welcome back! Here's an overview of your mess.</p>
      </motion.div>
      <motion.div
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants}>
          <StatCard
            title="Mess Capacity"
            value={`${stats?.messCapacity.current || 0} / ${stats?.messCapacity.total || 0}`}
            icon={Users}
            loading={loading}
          />
        </motion.div>
        <motion.div variants={itemVariants}>
          <StatCard
            title="Pending Requests"
            value={stats?.pendingRequests || 0}
            icon={UserPlus}
            loading={loading}
          />
        </motion.div>
        <motion.div variants={itemVariants}>
          <StatCard
            title="Today's Guests"
            value={stats?.dailyGuests || 0}
            icon={UtensilsCrossed}
            loading={loading}
          />
        </motion.div>
        <motion.div variants={itemVariants}>
          <StatCard
            title="Monthly Revenue"
            value={stats?.monthlyRevenue || 0}
            icon={DollarSign}
            loading={loading}
            format={(v) => `₹${(v / 1000).toFixed(1)}k`}
          />
        </motion.div>
      </motion.div>
      <motion.div
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="lg:col-span-2">
          <Card className="h-[400px] shadow-sm">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center h-full text-muted-foreground">
                <p>Activity chart coming soon...</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div variants={itemVariants}>
          <Card className="h-[400px] shadow-sm">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center h-full text-muted-foreground">
                <p>Quick actions coming soon...</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
}
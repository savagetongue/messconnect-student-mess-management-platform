import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { DollarSign, Users, ShieldAlert, Building } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { getSystemAnalytics } from '@/lib/api';
import { SystemAnalytics } from '@/lib/types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
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
export function SuperAdminDashboardPage() {
  const [analytics, setAnalytics] = useState<SystemAnalytics | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchAnalytics = async () => {
      setLoading(true);
      const data = await getSystemAnalytics();
      setAnalytics(data);
      setLoading(false);
    };
    fetchAnalytics();
  }, []);
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring' as const, stiffness: 100 } },
  };
  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="text-4xl font-bold tracking-tight text-foreground">SuperAdmin Dashboard</h1>
        <p className="text-lg text-muted-foreground">System-wide overview and analytics.</p>
      </motion.div>
      <motion.div
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants}>
          <StatCard title="Total Users" value={analytics?.totalUsers || 0} icon={Users} loading={loading} />
        </motion.div>
        <motion.div variants={itemVariants}>
          <StatCard title="Total Messes" value={analytics?.totalMesses || 0} icon={Building} loading={loading} />
        </motion.div>
        <motion.div variants={itemVariants}>
          <StatCard title="Total Revenue" value={analytics?.totalRevenue || 0} icon={DollarSign} loading={loading} format={(v) => `₹${(v / 1000).toFixed(1)}k`} />
        </motion.div>
        <motion.div variants={itemVariants}>
          <StatCard title="Open Complaints" value={analytics?.openComplaints || 0} icon={ShieldAlert} loading={loading} />
        </motion.div>
      </motion.div>
      <motion.div
        variants={itemVariants}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.2 }}
      >
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Monthly Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[350px]">
              {loading ? (
                <Skeleton className="h-full w-full" />
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={analytics?.revenueByMonth}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis tickFormatter={(value) => `₹${Number(value) / 1000}k`} />
                    <Tooltip formatter={(value) => [`₹${Number(value).toLocaleString()}`, 'Revenue']} />
                    <Legend />
                    <Bar dataKey="revenue" fill="var(--color-primary)" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
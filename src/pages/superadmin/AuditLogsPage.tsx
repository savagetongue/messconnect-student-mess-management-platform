import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { format, parseISO } from 'date-fns';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { getAuditLogs } from '@/lib/api';
import { AuditLog } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
export function AuditLogsPage() {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchLogs = async () => {
      setLoading(true);
      const data = await getAuditLogs();
      setLogs(data);
      setLoading(false);
    };
    fetchLogs();
  }, []);
  const renderSkeleton = () => (
    Array.from({ length: 10 }).map((_, i) => (
      <TableRow key={i}>
        <TableCell><Skeleton className="h-4 w-48" /></TableCell>
        <TableCell><Skeleton className="h-4 w-32" /></TableCell>
        <TableCell><Skeleton className="h-4 w-64" /></TableCell>
        <TableCell><Skeleton className="h-4 w-24" /></TableCell>
      </TableRow>
    ))
  );
  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="text-4xl font-bold tracking-tight text-foreground">Audit Logs</h1>
        <p className="text-lg text-muted-foreground">Track all significant actions performed in the system.</p>
      </motion.div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
        <Card>
          <CardHeader>
            <CardTitle>System Actions</CardTitle>
            <CardDescription>A chronological record of system events.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Timestamp</TableHead>
                  <TableHead>Actor</TableHead>
                  <TableHead>Action</TableHead>
                  <TableHead>Entity</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? renderSkeleton() : logs.map((log) => (
                  <TableRow key={log.id}>
                    <TableCell>{format(parseISO(log.timestamp), 'MMM d, yyyy, hh:mm a')}</TableCell>
                    <TableCell>
                      <div className="font-medium">{log.actor.name}</div>
                      <Badge variant="outline" className="capitalize">{log.actor.role}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">{log.action}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="font-mono text-xs">{log.entityType}:{log.entityId}</div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
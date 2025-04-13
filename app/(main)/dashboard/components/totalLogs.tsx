"use client";

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { UserCheck } from 'lucide-react';

interface UserLogsProps {
  activeUsers: number;
}

const UserLogs = ({ activeUsers }: UserLogsProps) => {
  return (
    <Card className="bg-card border-accent">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">Active Users</CardTitle>
        <UserCheck className="h-4 w-4 text-primary" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{activeUsers}</div>
      </CardContent>
    </Card>
  );
};

export default UserLogs;
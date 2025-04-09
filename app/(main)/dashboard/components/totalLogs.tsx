"use client";

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { UserCheck } from 'lucide-react';

interface UserLogsProps {
  activeUsers: number;
}

const UserLogs = ({ activeUsers }: UserLogsProps) => {
  return (
    <Card className="bg-[#001523] border-[#002945]">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-[#B3B3B3]">Active Users</CardTitle>
        <UserCheck className="h-4 w-4 text-[#00406C]" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{activeUsers}</div>
      </CardContent>
    </Card>
  );
};

export default UserLogs;
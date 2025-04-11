"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Users } from "lucide-react";

interface TotalUsersProps {
  totalUsers: number;
}

export default function TotalUsers({ totalUsers }: TotalUsersProps) {
  return (
    <Card className="bg-[#001523] border-[#002945]">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-[#B3B3B3]">Total Users</CardTitle>
        <Users className="h-4 w-4 text-[#00406C]" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{totalUsers}</div>
      </CardContent>
    </Card>
  );
}
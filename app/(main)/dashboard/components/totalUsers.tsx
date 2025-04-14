"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Users } from "lucide-react";

interface TotalUsersProps {
  totalUsers: number;
}

export default function TotalUsers({ totalUsers }: TotalUsersProps) {
  return (
    <Card className="bg-card border-accent">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">Total Users</CardTitle>
        <Users className="h-4 w-4 text-primary" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{totalUsers}</div>
      </CardContent>
    </Card>
  );
}
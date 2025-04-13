"use client";

import { FileCode } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ProjectsDashboardProps {
  totalProject: number;
}

const ProjectsDashboard = ({ totalProject }: ProjectsDashboardProps) => {
  return (
    <Card className="bg-popover border-accent">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">All Projects</CardTitle>
        <FileCode className="h-4 w-4 text-primary" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{totalProject}</div>
      </CardContent>
    </Card>
  );
};

export default ProjectsDashboard;
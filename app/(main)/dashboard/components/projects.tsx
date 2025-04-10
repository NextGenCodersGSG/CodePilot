"use client";

import { FileCode } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ProjectsDashboardProps {
  totalProject: number;
}

const ProjectsDashboard = ({ totalProject }: ProjectsDashboardProps) => {
  return (
    <Card className="bg-[#001523] border-[#002945]">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-[#B3B3B3]">All Projects</CardTitle>
        <FileCode className="h-4 w-4 text-[#00406C]" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{totalProject}</div>
      </CardContent>
    </Card>
  );
};

export default ProjectsDashboard;
"use client";

import { FileCode } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface AIReviewDashboardProps {
  totalAIReviews: number;
}

const AIReviewDashboard = ({ totalAIReviews }: AIReviewDashboardProps) => {
  return (
    <Card className="bg-popover border-accent">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">AI Code Reviews</CardTitle>
        <FileCode className="h-4 w-4 text-primary" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{totalAIReviews}</div>
      </CardContent>
    </Card>
  );
};

export default AIReviewDashboard;
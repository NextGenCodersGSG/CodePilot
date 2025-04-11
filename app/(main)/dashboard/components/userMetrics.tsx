import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TabsContent } from "@radix-ui/react-tabs";
import { useEffect, useState } from "react";

const UserMetrics = () => {
    const [metrics, setMetrics] = useState({
        bugsCount: 0,
        performanceIssuesCount: 0,
        securityIssuesCount: 0,
        totalIssues: 0
    });

    useEffect(() => {
        const fetchMetrics = async () => {
            try {
                const response = await fetch('/api/user-metrics');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                if (!data.success) {
                    throw new Error('Expected success to be true');
                }

                const { metrics } = data;
                setMetrics(metrics);
            } catch (error) {
                console.error("Error fetching metrics:", error);
            }
        };

        fetchMetrics();
    }, []);

    const bugsPercentage = metrics.totalIssues ? (metrics.bugsCount / metrics.totalIssues) * 100 : 0;
    const performancePercentage = metrics.totalIssues ? (metrics.performanceIssuesCount / metrics.totalIssues) * 100 : 0;
    const securityPercentage = metrics.totalIssues ? (metrics.securityIssuesCount / metrics.totalIssues) * 100 : 0;

    return (
        <Card className="bg-[#001523] border-[#002945]">
            <CardHeader>
                <CardTitle>User Engagements Metrics </CardTitle>
                    <CardDescription className="text-[#B3B3B3]">Detailed analytics on user engagement</CardDescription>
            </CardHeader>
            <CardContent>
            <div className="w-full h-full">
                <div className="space-y-2">
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-[#B3B3B3]">Bugs</span>
                        <span className="text-sm text-[#B3B3B3]">{metrics.bugsCount} ({bugsPercentage.toFixed(2)}%)</span>

                    </div>
                    <div className="h-2 w-full bg-[#001A2C] rounded-full overflow-hidden ">
                        <div className="h-full bg-[#DC2626] rounded-full" style={{ width: `${bugsPercentage}%` }}></div>
                    </div>
                </div>

                <div className="space-y-2">
                    <div className="flex items-center justify-between mt-6">
                        <span className="text-sm text-[#B3B3B3]">Performance Issues</span>
                        <span className="text-sm text-[#B3B3B3]">{metrics.performanceIssuesCount} ({performancePercentage.toFixed(2)}%)</span>

                    </div>
                    <div className="h-2 w-full bg-[#001A2C] rounded-full overflow-hidden">
                        <div className="h-full bg-[#FBBF24] rounded-full" style={{ width: `${performancePercentage}%` }}></div>
                    </div>
                </div>

                <div className="space-y-2">
                    <div className="flex items-center justify-between mt-6">
                        <span className="text-sm text-[#B3B3B3]">Security Issues</span>
                        <span className="text-sm text-[#B3B3B3]">{metrics.securityIssuesCount} ({securityPercentage.toFixed(2)}%)</span>

                    </div>
                    <div className="h-2 w-full bg-[#001A2C] rounded-full overflow-hidden">
                        <div className="h-full bg-[#34D399] rounded-full" style={{ width: `${securityPercentage}%` }}></div>
                    </div>
                </div>
            </div>
            </CardContent>
            </Card>

            );
}

            export default UserMetrics;